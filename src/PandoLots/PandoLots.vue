<template>
  <div :class="classes()">
    <wrapper>
      <template #activator="{ on }">
        <component
          :is="Entry"
          :loading="loading"
          :theme-color="themeColor"
          v-on="on"
        />
      </template>
      <chat :chats="chats" />
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
      type: Number,
      default: NaN
    },
    themeColor: {
      type: String,
      default: '#F5F5F5',
    }
  },
  setup(props) {
    const { type } = props;
    const classes = classnames();
    const loading = ref(true);
    const showChat = ref(false);
    const groupInfo = ref({});
    const Entry = type === 'button' ? EntryButton : EntryCard;
    const chats = [
      {
        name: 'Luong Danh',
        create_at: Date.now(),
        content: 'please help me to get the wallet address, i can\'t find it in fennec wallet',
        origin: 'mixin'
      },
      {
        name: '0x22E8uu823eysc43ff746f08',
        create_at: Date.now() + 10000,
        content: 'Hello~I’m from Fennec',
        origin: 'fennec'
      },
      {
        name: '0x22E8uu823eysc43ff746f08',
        create_at: Date.now() + 40500,
        content: 'Hello~I’m from Home',
        origin: 'self'
      },
      {
        name: 'Lrytt23dsdsa',
        create_at: Date.now() + 60200,
        content: '',
        origin: 'mixin',
        only_mixin: true
      }
    ];

    onMounted(() => {
      console.info('PandoLots mounted!');
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    });

    return { classes, loading, showChat, groupInfo, Entry, chats };
  }
});
</script>