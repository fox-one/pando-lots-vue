<template>
  <div :class="classes()">
    <v-layout column :class="classes('header', 'pa-6')">
      <h2 :class="classes('header-title')">{{ title }}</h2>
      <div :class="classes('header-total', 'd-flex align-center mt-6')">
        <f-icon-crowd-fill style="width: 16px; height: 16px" />
        <span class="ml-3">{{ total }}</span>
      </div>
      <div :class="classes('header-id', 'd-flex align-center mt-4')">
        <f-icon-horn-4-p-fill style="width: 16px; height: 16px" />
        <span class="ml-3" v-html="communityId" />
      </div>
    </v-layout>
    <f-scroll
      ref="scroll"
      :pulldown="false"
      :pullup="false"
      :height="height"
    >
      <section class="py-6">
        <div :class="classes('chat-limit', 'd-flex align-top px-6 pb-6')">
          <i :class="classes('chat-limit-icon', 'flex-shrink-0')">
            <f-icon-bell />
          </i>
          <a :href="download" :class="classes('chat-limit-txt', 'ml-4')">{{ chatLimit }}</a>
        </div>
        <item v-for="(chat, ind) in chats" :key="ind" :chat="chat" class="px-6 mt-6" />
      </section>
    </f-scroll>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  onMounted,
  ref
} from '@vue/composition-api';
import classnames from '@utils/classnames';
import { isMobile, isIOS } from '@utils/ua';
import { toThousandSeparator } from '@utils/number';
import { FIconCrowdFill, FIconHorn4PFill, FIconBell } from '@foxone/icons';
import { VLayout } from 'vuetify/lib';
import { scrollWrapperHeight } from '@foxone/vue-scroll';
import FScroll from '@foxone/vue-scroll/es/Scroll';
import Item from './Item.vue';
import { $t } from '@locale/index';

export interface Chat {
  avatar_url: string;
  content: string;
  name: string;
  created_at: string;
  origin: string;
}

export default defineComponent({
  name: 'Chat',
  components: {
    FScroll,
    Item,
    VLayout,
    FIconCrowdFill,
    FIconHorn4PFill,
    FIconBell
  },
  props: {
    group: {
      type: Object as PropType<{
        id: string;
        title: string;
        total: number;
        download_ios: string;
        download_android: string;
      }>,
      default: () => ({})
    },
    chats: {
      type: Array as PropType<Chat[]>,
      default: () => []
    }
  },
  setup(props) {
    const { group } = props;
    const classes = classnames('chat');
    const scroll = ref<any>(null);
    onMounted(() => {
      setTimeout(() => {
        scroll.value.scrollTo(0, scroll.value.scroll.maxScrollY, 100);
      }, 300);
    });

    return {
      classes,
      title: `#${group.title ?? ''}`,
      scroll,
      total: toThousandSeparator(group.total ?? 0), communityId: $t('chat_title', { id: `<a class="${classes('header-id-link')}">${group.id}</a>` }),
      chatLimit: $t('chat_limit'),
      download: isIOS ? group.download_ios : group.download_android
    };
  },
  computed: {
    height() {
      return scrollWrapperHeight(isMobile ? 56 + 155 + 153 : 32 + 32 + 155 + 153);
    }
  }
});
</script>