<template>
  <div :class="classes()">
    <wrapper>
      <template #activator="{ on }">
        <component
          :is="Entry"
          :title="title"
          :status="status"
          :loading="loading"
          :members="members"
          :theme-color="themeColor"
          @click="handleEntryClick(on.click)"
        />
      </template>
      <section @click.stop>
        <chat
          ref="chat"
          :loading="chatLoading"
          :chats="chats"
          :group="groupInfo"
          :groups="groups"
          :theme-color="themeColor"
          @select:group="handleGroupChange"
        />
        <comment
          v-if="isLogin"
          :status="status"
          @send="handleSend"
          @upload="handleUpload"
          @disconnect="handleLogout"
        />
        <connect-wallet
          v-else
          :fennec="!fennec"
          :client-id="groupInfo.client_id"
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
import { isLogin, removeAuth } from '@utils/auth';
import { isIOS } from '@utils/ua';
import { getGroups, setGroup } from '@utils/group';
import { getGroupInfo, getMessages, sendMessage, getSettings, getStreams } from '@apis/index';
import Wrapper from '../Wrapper';
import EntryButton from '../EntryButton';
import EntryCard from '../EntryCard';
import Comment from '../Comment';
import ConnectWallet from '../ConnectWallet';
import Chat from '../Chat';
import Stream from '../Stream';
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
    Stream,
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
    const showChat = ref(false);
    const fennec = ref(false);
    const chat = ref<null | any>(null);
    const title = ref('');
    const status = ref('chat');
    const groups = ref(getGroups());
    const Entry = type === 'button' ? EntryButton : EntryCard;
    const members = {
      avatars: [] as string[],
      total: 0
    };
    const login = isLogin(groupId);

    const chats = ref<any[]>([]);
    const groupInfo = ref({
      name: '',
      id: '',
      total: 0,
      download: '',
      client_id: ''
    });
    const supportMessages = ['PLAIN_TEXT', 'PLAIN_IMAGE'];

    const requestHandler = async (id: string) => {
      try {
        const [info, messages] = await Promise.all([
          getGroupInfo(id),
          getMessages(id)
        ]);
        chats.value = [];
        for (let i = 0; i < messages.length; i++) {
          const msg = messages[i];
          chats.value.push({
            name: msg.speaker_name,
            avatar_url: msg.speaker_avatar,
            created_at: msg.created_at,
            content: msg.text,
            origin: 'mixin',
            only_mixin: !!~supportMessages.indexOf(msg.category)
          });
          if (i >= messages.length - (type === 'button' ? 2 : 3)) {
            members.avatars.push(msg.speaker_avatar || '');
          }
        }
        while(members.avatars.length < (type === 'button' ? 2 : 3)) {
          members.avatars.push('');
        }
        members.total = info.members_count.paid;
        groupInfo.value = {
          name: info.name,
          id: info.identity_number,
          total: info.members_count.paid,
          download: isIOS ? info.app_info.download_url_ios : info.app_info.download_url_android,
          client_id: info.client_id
        };
        return {
          info,
          messages
        };
      } catch (e) {
        ctx.emit('error', e);
      }
    };

    onMounted(async () => {
      setTimeout(() => {
        fennec.value = $fennec?.isAvailable() ?? false;
      }, 200);
      const { info } = await requestHandler(groupId) ?? {};
      const [data, stream, settings] = await Promise.all([
        requestHandler(groupId),
        getStreams(groupId),
        login ? getSettings() : Promise.resolve({})
      ]);

      if (stream && !stream.disabled) {
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
      title.value = data?.info?.name ?? '';
      loading.value = false;
    });

    return {
      classes,
      loading,
      chatLoading,
      showChat,
      groupInfo,
      groups,
      Entry,
      chat,
      chats,
      members,
      isLogin: login,
      fennec,
      title,
      status,
      requestHandler
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
      setGroup(this.groupId, this.groupInfo);
      this.groups = getGroups();
      cb();
    },
    async handleGroupChange(id: string) {
      this.chatLoading = true;
      await this.requestHandler(id);
      this.chatLoading = false;
      this.chat?.refresh();
    }
  }
});
</script>