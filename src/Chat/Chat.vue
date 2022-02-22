<template>
  <div ref="menuParentRef"  :class="[classes(), classes(isMobile ? 'mobile' : 'pc')].join(' ')" >
    <v-layout ref="topRef" column :class="classes('header', 'pa-6')">
      <h2
        :class="classes('header-title', 'd-flex align-center')"
        :style="Object.keys(groups).length > 1 && 'cursor: pointer;'"
        @click="() => { if(Object.keys(groups).length > 1) showMenu = !showMenu }"
      >
        {{ `#${group.name || ''}` }}
        <f-icon-chevron-down
          v-if="Object.keys(groups).length > 1"
          style="width: 24px; height: 24px"
          :style="showMenu && 'transform: rotate(180deg)'"
          class="ml-2"
        />
      </h2>
      <div :class="classes('header-total', 'd-flex align-center mt-6')">
        <f-icon-crowd-fill style="width: 16px; height: 16px" />
        <span class="ml-3">{{ total }}</span>
      </div>
      <div :class="classes('header-id', 'd-flex align-center mt-4')">
        <f-icon-horn-4-p-fill style="width: 16px; height: 16px" />
        <span class="ml-3" v-html="communityWithId" />
      </div>
      <stream v-if="status === 'stream'" :urls="source" class="mt-6" />
    </v-layout>
    <f-scroll
      ref="scroll"
      :pulldown="false"
      :pullup="false"
      :height="height"
    >
      <section class="py-6">
        <f-loading v-if="loading" :color="themeColor" :loading="loading" class="py-10" />
        <div :class="classes('chat-limit', 'd-flex align-top px-6 pb-6')">
          <i :class="classes('chat-limit-icon', 'flex-shrink-0')">
            <f-icon-bell />
          </i>
          <span :class="classes('chat-limit-txt', 'ml-4')">{{ chatLimit }}</span>
        </div>
        <item v-for="(chat, ind) in chatData" :key="ind" :chat="chat" :download="download" class="px-6 mt-6" />
      </section>
    </f-scroll>
    <v-menu v-model="showMenu" :class="classes('menu-wrapper')" :attach="menuParentRef" nudge-top="-64">
      <v-layout :class="classes('menu', 'px-4 py-2')" column align-start>
        <div
          v-for="(val, name) in groups"
          :key="name"
          :class="[classes('menu-item', 'py-3 d-flex justify-space-between align-center'), val.id === group.id ? classes('menu-item-active') : ''].join(' ')"
          @click="$emit('select:group', val.id)"
        >
          <span>{{ `#${val.name}` }}</span>
          <i v-if="val.id === group.id" :class="classes('menu-item-icon')" />
        </div>
      </v-layout>
    </v-menu>
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
import { isMobile } from '@utils/ua';
import { toThousandSeparator } from '@utils/number';
import Socket from '@utils/socket';
import { WS_BASE } from '@utils/constants';
import { isDev } from '@utils/request';
import { FIconCrowdFill, FIconHorn4PFill, FIconBell, FIconChevronDown } from '@foxone/icons';
import { VLayout, VMenu } from 'vuetify/lib';
import { scrollWrapperHeight } from '@foxone/vue-scroll';
import FScroll from '@foxone/vue-scroll/es/Scroll';
import Item from './Item.vue';
import Stream from '../Stream';
import { $t } from '@locale/index';

export interface Chat {
  avatar_url: string;
  content: string;
  name: string;
  created_at: string;
  origin: string;
  // eslint-disable-next-line no-undef
  category: API.MessageType;
  // eslint-disable-next-line no-undef
  attachment: API.Attachment;
}

export default defineComponent({
  name: 'Chat',
  components: {
    FScroll,
    Item,
    Stream,
    VLayout,
    VMenu,
    FIconCrowdFill,
    FIconHorn4PFill,
    FIconBell,
    FIconChevronDown
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
    group: {
      type: Object as PropType<{
        id: string;
        name: string;
        total: number;
        download: string;
      }>,
      default: () => ({})
    },
    groups: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    status: {
      type: String,
      default: 'chat',
    },
    source: {
      type: Object as PropType<{[key: string]: string}>,
      default: () => ({}),
    },
    chats: {
      type: Array as PropType<Chat[]>,
      default: () => []
    },
    themeColor: {
      type: String,
      default: '#F5F5F5',
    }
  },
  setup(props) {
    const { group, chats, isLogin } = props;
    const classes = classnames('chat');
    const download = group.download;
    const scroll = ref<any>(null);
    const menuParentRef = ref<null | HTMLElement>(null);
    const topRef = ref<null | HTMLElement>(null);
    const showMenu = ref(false);
    const chatData = ref(chats);
    const socket = ref(new Socket());
    const onmessage = function(msg) {
      chatData.value.push(msg);
    };

    onMounted(() => {
      setTimeout(() => {
        scroll.value.scrollTo(0, scroll.value.scroll.maxScrollY, 100);
        const url = `${WS_BASE[isDev ? 'dev' : 'prod']}/${group.id}`;
        isLogin && socket.value.connect(url, { onmessage });
      }, 300);
    });

    return {
      classes,
      scroll,
      menuParentRef,
      topRef,
      chatLimit: $t('chat_limit'),
      download,
      showMenu,
      isMobile,
      chatData
    };
  },
  data: function() {
    return {
      height: '0',
    };
  },
  computed: {
    total(): string {
      return toThousandSeparator(this.group.total ?? 0);
    },
    communityWithId(): string {
      return $t('chat_title', { id: `<a href="${this.download}" class="${this.classes('header-id-link')}">${this.group.id}</a>` });
    }
  },
  watch: {
    chats() {
      this.chatData = this.chats;
      setTimeout(() => {
        this.scroll.scrollTo(0, this.scroll.scroll.maxScrollY, 100);
      }, 300);
    }
  },
  mounted() {
    this.height = this.getHeight();
    setTimeout(() => {
      this.height = this.getHeight();
    }, 100);
  },
  methods: {
    refresh() {
      this.scroll.refresh();
    },
    getHeight () {
      const bottomHeight = this.isLogin ? 153 : 143;
      const topHeight = this.topRef?.clientHeight ?? 0;
      const gapHeight = isMobile ? 56 : 64;
      return scrollWrapperHeight(gapHeight + topHeight + bottomHeight);
    }
  }
});
</script>