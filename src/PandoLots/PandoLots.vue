<template>
  <div :class="classes()">
    <wrapper>
      <template #activator="{ on }">
        <slot name="activator" v-bind="{
          on: {...on, click: () => handleEntryClick(on.click)},
          data: entryData,
          loading,
          themeColor
        }">
          <component
            v-bind="entryData"
            :is="Entry"
            :loading="loading"
            :theme-color="themeColor"
            @click="handleEntryClick(on.click)"
            @error="$emit('error', $event)"
          />
        </slot>
      </template>
      <hello-model v-if="showHelloModel" :total-history="groupInfo.total_history" @click="handleFirstLogin" />
      <section v-else-if="!loading" @click.stop>
        <chat
          ref="chatDOM"
          :loading="chatLoading"
          :chats="chats"
          :group="groupInfo"
          :groups="groups"
          :status="status"
          :source="source"
          :is-login="login"
          :theme-color="themeColor"
          @select:group="handleGroupChange"
          @preview="handlePreview"
          @error="$emit('error', $event)"
        />
        <comment
          v-if="login"
          :name="userInfo.full_name"
          :status="status"
          :uploading="uploading"
          :theme-color="themeColor"
          @send="handleSend"
          @upload="handleUpload"
          @disconnect="handleLogout"
          @error="$emit('error', $event)"
        />
        <connect-wallet
          v-else
          :group-id="groupInfo.id"
          :client-id="groupInfo.client_id"
          :loading="loginLoading"
          @login:mixin="handleLogin('mixin', $event)"
          @login:fennec="handleLogin('fennec', $event)"
          @error="$emit('error', $event)"
        />
      </section>
    </wrapper>
    <image-gallery
      :index="previewIndex"
      :is-open="isPreview"
      :items="previews"
      @close="isPreview = false; previewIndex = null"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  PropType
} from '@vue/composition-api';
import classnames from '@utils/classnames';
import { setApiBase } from '@utils/request';
import { setWsBase } from '@utils/socket';
import {
  isLogin,
  removeAuth,
  setToken,
  setUser,
  getUser
} from '@utils/auth';
import { encode } from 'js-base64';
import { isIOS } from '@utils/ua';
import { getGroups, setGroup } from '@utils/group';
import { decodeFileImage, getImgWH } from '@utils/image';
import states from '@utils/states';
import { getStore, setStore } from '@utils/storage';
import {
  authFennec,
  authMixin,
  getGroupInfo,
  getMessages,
  sendMessage,
  getSettings,
  getStreams,
  getStreamInfo,
  getUserInfo,
  uploadAttachment
} from '@apis/index';
import Wrapper from '../Wrapper';
import EntryButton from '../EntryButton';
import EntryCard from '../EntryCard';
import Comment from '../Comment';
import ConnectWallet from '../ConnectWallet';
import Chat from '../Chat';
import HelloModel from '../HelloModel';
import ImageGallery from '../ImageGallery';

const supportMessages = ['PLAIN_TEXT', 'PLAIN_IMAGE'];

export default defineComponent({
  name: 'PandoLots',
  components: {
    Wrapper,
    EntryButton,
    EntryCard,
    Comment,
    ConnectWallet,
    Chat,
    HelloModel,
    ImageGallery
  },
  props: {
    type: {
      type: String as PropType<'button' | 'card'>,
      default: 'card'
    },
    groupId: {
      type: String,
      default: ''
    },
    clientId: {
      type: String,
      default: ''
    },
    themeColor: {
      type: String,
      default: '#F5F5F5',
    },
    apiBase: {
      type: String,
      default: 'https://supergroup-api.mixin.fan/v1',
    },
    wsBase: {
      type: String,
      default: 'wss://supergroup-api.mixin.fan',
    }
  },
  setup(props, ctx) {
    const { type, groupId, clientId, apiBase, wsBase } = props;
    setApiBase(groupId, apiBase);
    setWsBase(groupId, wsBase);
    const classes = classnames();
    const loading = ref(true);
    const chatLoading = ref(false);
    const loginLoading = ref(false);
    const uploading = ref(false);
    const showChat = ref(false);
    const fennec = ref(false);
    const showHelloModel = ref(false);
    const isPreview = ref(false);
    const previewIndex = ref(0);
    const previews = ref<any[]>([]);
    const login = ref(isLogin(groupId));
    const currentGroupId = ref(groupId);

    const chatDOM = ref<null | any>(null);
    const status = ref('chat');
    const chats = ref<any[]>([]);
    const groupInfo = ref({
      name: '',
      id: '',
      total: 0,
      download: '',
      client_id: '',
      total_history: 100
    });
    const groups = ref(getGroups());
    const source = ref<Record<string, string>>({});
    const userInfo = ref(getUser(groupId));

    const Entry = type === 'button' ? EntryButton : EntryCard;
    const entryData = ref({
      title: '',
      status: '',
      members: {
        avatars: [] as string[],
        total: 0
      }
    });

    if (!login.value && getStore('first_login') == void 0) {
      setStore('first_login', true);
    }

    const requestHandler = async (id: string, clientId:string) => {
      login.value = isLogin(id);
      userInfo.value = getUser(id);
      try {
        const storeGroupInfo = states.getGroup(id);
        const [info, messages, urls, stream, settings] = await Promise.all([
          storeGroupInfo ? Promise.resolve(storeGroupInfo) : getGroupInfo(id),
          getMessages(id),
          login.value ? getStreams(id).catch(() => ({})) : Promise.resolve({}),
          getStreamInfo(id),
          login.value ? getSettings(id, void 0) : Promise.resolve({})
        ]);
        if (!storeGroupInfo) states.setGroup(id, info);

        // set group chats
        chats.value = [];
        for (let i = 0; i < messages.length; i++) {
          const msg = messages[i];
          chats.value.push({
            id: msg.id,
            name: msg.speaker_name,
            avatar_url: msg.speaker_avatar,
            created_at: msg.created_at,
            content: msg.text,
            origin: 'mixin',
            category: msg.category,
            speaker_id: msg.speaker_id,
            attachment: msg.attachment,
            only_mixin: !~supportMessages.indexOf(msg.category)
          });
        }
        // set group info
        groupInfo.value = {
          name: info.name,
          id: info.identity_number,
          total: info.members_count.paid,
          download: isIOS ? info.app_info.download_url_ios : info.app_info.download_url_android,
          client_id: clientId || info.client_id,
          total_history: info.lots_history_messages_count ?? 100
        };
        (console as any).log(groupInfo);
        // set group streams
        Object.keys(urls).forEach(k => {
          if (~k.indexOf('hls')) {
            source.value[k] = urls[k];
          }
        });
        if (stream && !stream.disabled && Object.keys(source.value).length) {
          status.value = 'stream';
        } else {
          switch(settings['group-mode']) {
            case 'lecture':
              status.value = 'lecturing';
              break;
            case 'mute':
              status.value = 'mute';
              break;
            default:
              status.value = 'chat';
          }
        }

        return {
          info,
          messages,
          urls,
          stream,
          settings
        };
      } catch (e) {
        ctx.emit('error', e);
      }
    };

    onMounted(async () => {
      (console as any).log('onMounted', groupId, clientId);
      const { info } = await requestHandler(groupId, clientId) || {};
      entryData.value.title = info?.name ?? '';
      const count = type === 'button' ? 2 : 3;
      // empty string is placeholder for empty active_users cases
      const users: any[] = [...(info?.active_users ?? []), '', '', ''].slice(0, count);
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        entryData.value.members.avatars.push(user?.avatar_url || user?.speaker_avatar || '');
      }
      entryData.value.members.total = info?.members_count.paid ?? 0;
      entryData.value.status = status.value;
      loading.value = false;
    });

    return {
      Entry,
      entryData,
      classes,
      requestHandler,
      loading,
      uploading,
      chatLoading,
      loginLoading,
      showHelloModel,
      showChat,
      userInfo,
      groupInfo,
      groups,
      chatDOM,
      chats,
      login,
      fennec,
      status,
      source,
      currentGroupId,
      isPreview,
      previews,
      previewIndex
    };
  },
  methods: {
    handleSend(val: string) {
      if (!val) return;
      sendMessage(this.groupId, {
        category: 'PLAIN_TEXT',
        data: encode(val)
      }).then((res) => {
        this.chats.push({
          ...res,
          category: 'PLAIN_TEXT',
          created_at: new Date().toISOString(),
          content: val,
          origin: 'self',
          name: this.userInfo.full_name,
          speaker_id: this.userInfo.user_id
        });
      });
    },
    async handleUpload(files: File[]) {
      const file = files[0];
      if (!~file.type.indexOf('image')) {
        this.$emit('error', { message: 'The file type must be image' });
        return;
      }
      // 5 MB
      if (file.size / (1024 * 1024) > 5) {
        this.$emit('error', { message: 'The file size is too large' });
        return;
      }

      this.uploading = true;
      const formData = new FormData();
      formData.append('file', file);
      const [ uploadData, imgData ] = await Promise.all([
        uploadAttachment(this.groupId, formData),
        decodeFileImage(file)
      ]);
      const payload = {
        category: 'PLAIN_IMAGE',
        attachment_id: uploadData.attachment_id,
        size: file.size,
        created_at: new Date().toISOString(),
        mime_type: file.type,
        height: imgData.height,
        width: imgData.width,
      };
      const data = encode(JSON.stringify(payload));
      sendMessage(this.groupId, {
        category: 'PLAIN_IMAGE',
        data
      }).then((res) => {
        this.chats.push({
          ...res,
          origin: 'self',
          name: this.userInfo.full_name
        });
        this.uploading = false;
      });
    },
    handleLogout() {
      removeAuth(this.groupId);
      this.chatDOM?.closeSocket();
      this.login = false;
    },
    async handleEntryClick(cb) {
      const groups = getGroups();
      if (getStore('first_login') && this.login) {
        this.showHelloModel = true;
      }
      if (!groups[this.groupId]) {
        setGroup(this.groupId, this.groupInfo);
        groups[this.groupId] = this.groupInfo;
      }
      this.groups = groups;
      if (this.currentGroupId !== this.groupId) {
        this.handleGroupChange(this.groupId, this.clientId);
      }
      cb();
    },
    async handleGroupChange(id: string, clientId:string) {
      this.currentGroupId = id;
      this.chatLoading = true;
      this.chatDOM?.closeSocket();
      await this.requestHandler(id, clientId);
      this.chatLoading = false;
      this.chatDOM?.refresh();
      this.chatDOM?.connectSocket();
    },
    handleLogin(type: 'mixin' | 'fennec', code: string) {
      this.loginLoading = true;
      (type === 'fennec' ? authFennec : authMixin)(this.groupId, code)
        .then(async (res) => {
          if (res.token) {
            setToken({ token: res.token, groupId: this.groupId });
            const [user, settings, urls, stream] = await Promise.all([
              getUserInfo(this.groupId, res.token),
              getSettings(this.groupId, res.token),
              getStreams(this.groupId),
              getStreamInfo(this.groupId)
            ]);
            setUser({ user: user, groupId: this.groupId });
            this.userInfo = user;

            Object.keys(urls).forEach(k => {
              if (~k.indexOf('hls')) {
                this.source[k] = urls[k];
              }
            });
            if (stream && !stream.disabled && Object.keys(this.source).length) {
              this.status = 'stream';
            } else {
              switch(settings['group-mode']) {
                case 'lecture':
                  this.status = 'lecturing';
                  break;
                case 'mute':
                  this.status = 'mute';
                  break;
                default:
                  this.status = 'chat';
              }
            }

            if (getStore('first_login')) {
              this.showHelloModel = true;
            }

            this.login = true;
          } else {
            this.$emit('error', res);
          }
          this.loginLoading = false;
        })
        .catch(e => {
          this.$emit('error', e);
          this.loginLoading = false;
        });
    },
    handleFirstLogin () {
      this.showHelloModel = false;
      setStore('first_login', false);
    },
    async handlePreview(src: string) {
      const previewData = await getImgWH([src]);
      this.previewIndex = 0;
      this.previews.splice(0, this.previews.length, ...previewData);
      this.isPreview = true;
    }
  }
});
</script>