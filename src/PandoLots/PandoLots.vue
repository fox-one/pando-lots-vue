<template>
  <div :class="classes()">
    <wrapper>
      <template #activator="{ on }">
        <component
          :is="Entry"
          :loading="loading"
          :members="members"
          :theme-color="themeColor"
          v-on="on"
        />
      </template>
      <section @click.stop>
        <chat :chats="chats" :group="groupInfo" />
        <comment />
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
import { setGroupId } from '@utils/request';
import { getGroupInfo, getMessages } from '@apis/index';
import Wrapper from '../Wrapper';
import EntryButton from '../EntryButton';
import EntryCard from '../EntryCard';
import Comment from '../Comment';
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
    }
  },
  setup(props, ctx) {
    const { type, groupId } = props;
    setGroupId(groupId);
    const classes = classnames();
    const loading = ref(true);
    const showChat = ref(false);
    const Entry = type === 'button' ? EntryButton : EntryCard;
    const chats = [] as any[];
    const members = {
      avatars: [] as string[],
      total: 0
    };
    const groupInfo = {
      id: '',
      title: '',
      total: 0
    };
    const supportMessages = ['PLAIN_TEXT', 'PLAIN_IMAGE'];

    onMounted(async () => {
      try {
        const [info, messages] = await Promise.all([
          getGroupInfo(groupId),
          getMessages(groupId)
        ]);
        messages.forEach(m => {
          chats.push({
            name: m.speaker_name,
            avatar_url: m.speaker_avatar,
            created_at: m.created_at,
            content: m.text,
            origin: 'mixin',
            only_mixin: !!~supportMessages.indexOf(m.category)
          });
        });
        for (let i = 0; i < messages.length; i++) {
          const msg = messages[i];
          chats.push({
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
        groupInfo.id = info.identity_number;
        groupInfo.title = info.name;
        groupInfo.total = info.members_count.paid;
        loading.value = false;
      } catch (e) {
        ctx.emit('error', e);
      }
    });

    return { classes, loading, showChat, groupInfo, Entry, chats, members };
  }
});
</script>