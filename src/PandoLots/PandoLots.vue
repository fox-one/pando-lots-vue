<template>
  <div :class="classes()">
    <wrapper>
      <template #activator="{ on }">
        <component
          v-bind="entryData"
          :is="Entry"
          :loading="loading"
          :theme-color="themeColor"
          @click="handleEntryClick(on.click)"
          @error="$emit('error', $event)"
        />
      </template>
      <section v-if="!loading" @click.stop>
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
          @error="$emit('error', $event)"
        />
        <comment
          v-if="login"
          :name="userInfo.full_name"
          :status="status"
          @send="handleSend"
          @upload="handleUpload"
          @disconnect="handleLogout"
          @error="$emit('error', $event)"
        />
        <connect-wallet
          v-else
          :fennec="!fennec"
          :group-id="groupInfo.id"
          :client-id="groupInfo.client_id"
          @login:mixin="handleMixinLogin"
          @login:fennec="handleFennecLogin"
          @error="$emit('error', $event)"
        />
      </section>
    </wrapper>
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
import $fennec from '@utils/fennec';
import { setGroupId, setDev } from '@utils/request';
import {
  isLogin,
  removeAuth,
  setToken,
  setUser,
  getUser
} from '@utils/auth';
import { isIOS } from '@utils/ua';
import { getGroups, setGroup } from '@utils/group';
import states from '@utils/states';
import {
  authFennec,
  authMixin,
  getGroupInfo,
  getMessages,
  sendMessage,
  getSettings,
  getStreams,
  getStreamInfo,
  getUserInfo
} from '@apis/index';
import Wrapper from '../Wrapper';
import EntryButton from '../EntryButton';
import EntryCard from '../EntryCard';
import Comment from '../Comment';
import ConnectWallet from '../ConnectWallet';
import Chat from '../Chat';
import HelloModel from '../HelloModel';

export default defineComponent({
  name: 'PandoLots',
  components: {
    Wrapper,
    EntryButton,
    EntryCard,
    Comment,
    ConnectWallet,
    Chat,
    HelloModel
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
    themeColor: {
      type: String,
      default: '#F5F5F5',
    },
    dev: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const { type, groupId, dev } = props;
    setGroupId(groupId);
    setDev(dev);
    const classes = classnames();
    const loading = ref(true);
    const chatLoading = ref(false);

    const login = ref(isLogin(groupId));
    const showChat = ref(false);
    const fennec = ref(false);
    const chatDOM = ref<null | any>(null);
    const status = ref('chat');
    const chats = ref<any[]>([]);
    const groupInfo = ref({
      name: '',
      id: '',
      total: 0,
      download: '',
      client_id: ''
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


    const supportMessages = ['PLAIN_TEXT', 'PLAIN_IMAGE'];

    const requestHandler = async (id: string) => {
      login.value = isLogin(id);
      userInfo.value = getUser(id);
      try {
        const storeGroupInfo = states.getGroup(id);
        const [info, messages, urls, stream, settings] = await Promise.all([
          storeGroupInfo ? Promise.resolve(storeGroupInfo) : getGroupInfo(id),
          getMessages(id),
          getStreams(id),
          getStreamInfo(id),
          login.value ? getSettings() : Promise.resolve({})
        ]);
        if (!storeGroupInfo) states.setGroup(id, info);

        // set group chats
        chats.value = [];
        for (let i = 0; i < messages.length; i++) {
          const msg = messages[i];
          chats.value.push({
            name: msg.speaker_name,
            avatar_url: msg.speaker_avatar,
            created_at: msg.created_at,
            content: msg.text,
            origin: 'mixin',
            category: msg.category,
            attachment: msg.attachment,
            only_mixin: !~supportMessages.indexOf(msg.category)
          });
        }
        groupInfo.value = {
          name: info.name,
          id: info.identity_number,
          total: info.members_count.paid,
          download: isIOS ? info.app_info.download_url_ios : info.app_info.download_url_android,
          client_id: info.client_id
        };

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
      setTimeout(() => {
        fennec.value = $fennec?.isAvailable() ?? false;
      }, 200);
      const { info, messages = [] } = await requestHandler(groupId) || {};
      entryData.value.title = info?.name ?? '';
      const lastLen = messages.length - (type === 'button' ? 2 : 3);
      for (let i = lastLen; i < messages.length; i++) {
        const msg = messages[i];
        entryData.value.members.avatars.push(msg?.speaker_avatar || '');
      }
      entryData.value.members.avatars.reverse();
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
      chatLoading,
      showChat,
      userInfo,
      groupInfo,
      groups,
      chatDOM,
      chats,
      login,
      fennec,
      status,
      source
    };
  },
  methods: {
    handleSend(val: string) {
      if (!val) return;
      sendMessage({
        category: 'PLAIN_TEXT',
        data: val
      }).then(() => {
        this.chats.push({
          created_at: new Date().toISOString(),
          content: val,
          origin: 'self'
        });
      });
    },
    handleUpload(files) {
      console.info('handleUpload', files);
    },
    handleLogout() {
      console.info('handleLogout');
      removeAuth(this.groupId);
    },
    handleEntryClick(cb) {
      const groups = getGroups();
      if (!groups[this.groupId]) {
        setGroup(this.groupId, this.groupInfo);
      }
      this.groups = getGroups();
      cb();
    },
    async handleGroupChange(id: string) {
      this.chatLoading = true;
      await this.requestHandler(id);
      this.chatLoading = false;
      this.chatDOM?.refresh();
    },
    handleMixinLogin(code: string) {
      authMixin(this.groupId, code).then((res) => {
        if (res.token) {
          setToken({
            token: res.token,
            groupId: this.groupId
          });
          getUserInfo()
            .then(res => {
              setUser({
                user: res,
                groupId: this.groupId
              });
              this.userInfo = res;
              this.login = true;
            });
        } else {
          this.$emit('error', res);
        }
      }).catch(e => this.$emit('error', e));
    },
    handleFennecLogin(token: string) {
      authFennec(this.groupId, token).then((res) => {
        if (res.token) {
          setToken({
            token: res.token,
            groupId: this.groupId
          });
          getUserInfo()
            .then(res => {
              setUser({
                user: res,
                groupId: this.groupId
              });
              this.userInfo = res;
              this.login = true;
            });
        } else {
          this.$emit('error', res);
        }
      }).catch(e => this.$emit('error', e));
    }
  }
});
</script>