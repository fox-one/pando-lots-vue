<template>
  <div :class="classes()">
    <f-scroll
      :pulldown="false"
      :pullup="false"
      :height="height"
    >
      <section>
        <item v-for="(chat, ind) in chats" :key="ind" :chat="chat" class="mt-6" />
      </section>
    </f-scroll>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType
} from '@vue/composition-api';
import classnames from '@utils/classnames';
import { scrollWrapperHeight } from '@foxone/vue-scroll';
import FScroll from '@foxone/vue-scroll/es/Scroll';
import Item from './Item.vue';

export interface Chat {
  avatar_url: string;
  content: string;
  name: string;
  create_at: string;
  origin: string;
}

export default defineComponent({
  name: 'Chat',
  components: {
    FScroll,
    Item
  },
  props: {
    chats: {
      type: Array as PropType<Chat[]>,
      default: () => []
    },
    prefixCls: {
      type: String,
      default: 'chat'
    }
  },
  setup(props) {
    const classes = classnames(props.prefixCls);
    onMounted(() => {
      console.info('Chat mounted!');
    });

    return { classes };
  },
  computed: {
    height() {
      return scrollWrapperHeight('50vh');
    }
  }
});
</script>