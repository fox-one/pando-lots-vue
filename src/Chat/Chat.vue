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
        <f-icon-crowd-fill style="width: 18px; height: 18px" />
        <span class="ml-3">{{ total }}</span>
      </div>
      <div :class="classes('header-id', 'd-flex align-center mt-4')">
        <f-icon-horn-4-p-fill style="width: 16px; height: 16px" />
        <span class="ml-3" v-html="communityWithId" />
      </div>
      <stream v-if="status === 'stream'" :urls="source" class="mt-6" @error="$emit('error', $event)" />
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
          <span :class="classes('chat-limit-txt', 'ml-4 font-weight-medium')">{{ chatLimit }}</span>
        </div>
        <item
          v-for="(chat, ind) in chatData"
          :key="chat.id || ind"
          v-intersect="(entries) => { if(ind >= chatData.length - 1) handleBottomIntersect(entries)}"
          :chat="chat"
          :download="download"
          class="px-6 mt-6"
          @preview="$emit('preview', $event)"
        />
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
/* eslint-disable no-undef */
import {
  defineComponent,
  PropType,
  onMounted,
  ref,
  nextTick
} from '@vue/composition-api';
import classnames from '@utils/classnames';
import { isMobile } from '@utils/ua';
import { toThousandSeparator } from '@utils/number';
import Socket from '@utils/socket';
import { WS_BASE } from '@utils/constants';
import { isDev } from '@utils/request';
import { getToken, getUser } from '@utils/auth';
import { FIconCrowdFill, FIconHorn4PFill, FIconBell, FIconChevronDown } from '@foxone/icons';
import { VLayout, VMenu } from 'vuetify/lib';
import { Intersect } from 'vuetify/lib/directives';
import { scrollWrapperHeight } from '@foxone/vue-scroll';
import FScroll from '@foxone/vue-scroll/es/Scroll';
import Item from './Item.vue';
import Stream from '../Stream';
import { $t } from '@locale/index';

export interface Chat {
  id: string;
  avatar_url: string;
  content: string;
  name: string;
  created_at: string;
  origin: string;
  category: API.MessageType;
  attachment: API.Attachment;
  speaker_id: string;
}

export default defineComponent({
  name: 'Chat',
  directives: {
    intersect: Intersect
  },
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
    const userInfo = getUser(group.id);
    const download = group.download;
    const chatData = ref(chats.map(chat => {
      if (chat.speaker_id === userInfo?.user_id) chat.origin = 'self';
      return chat;
    }));

    const scroll = ref<any>(null);
    const socket = ref(new Socket());
    const menuParentRef = ref<null | HTMLElement>(null);
    const topRef = ref<null | HTMLElement>(null);

    const showMenu = ref(false);
    const isBottomIntersect = ref(false);

    const scrollToBottom = () =>{
      const scroller = scroll.value;
      scroller.refresh();
      scroller.scrollTo(0, scroller?.scroll.maxScrollY, 100);
    };

    const onmessage = function(msg: {
      attachment: API.Attachment;
      category: API.MessageType;
      created_at: string;
      data: string;
      id: string;
      recipient_ids: string[];
      speaker_avatar: string;
      speaker_id: string;
      speaker_name: string;
      text:string;
    }) {
      let isRepeat = false;
      const userInfo = getUser(group.id);
      for (let i = chatData.value.length - 1; i >= 0; i--) {
        const chat = chatData.value[i];
        if (chat.id === msg.id) {
          isRepeat = true;
          break;
        }
      }
      if (!isRepeat) {
        chatData.value.push({
          id: msg.id,
          avatar_url: msg.speaker_avatar,
          content: msg.text,
          name: msg.speaker_name,
          created_at: msg.created_at,
          origin: userInfo?.user_id === msg.speaker_id ? 'self' : 'mixin',
          category: msg.category,
          attachment: msg.attachment,
          speaker_id: msg.speaker_id,
        });
        if (isBottomIntersect.value) {
          nextTick(() => {
            scrollToBottom();
          });
        }
      }
    };

    const connectSocket = () => {
      setTimeout(() => {
        const url = `${WS_BASE[isDev ? 'dev' : 'prod']}/${group.id}`;
        isLogin && socket.value.connect(url, getToken(group.id), { onmessage });
      }, 100);
    };

    onMounted(() => {
      setTimeout(() => {
        scrollToBottom();
        connectSocket();
      }, 300);
    });

    return {
      socket,
      classes,
      scroll,
      menuParentRef,
      topRef,
      chatLimit: $t('chat_limit'),
      download,
      showMenu,
      isBottomIntersect,
      isMobile,
      chatData,
      connectSocket
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
  updated() {
    if (!this.topRef?.clientHeight) return;
    const height = this.getHeight();
    if (this.height !== height) {
      this.height = height;
      this.refresh();
    }
  },
  methods: {
    refresh() {
      this.scroll.refresh();
    },
    getHeight () {
      const bottomHeight = this.isLogin ? 148 : 143;
      const topHeight = this.topRef?.clientHeight ?? this.topRef?.offsetHeight ?? 0;
      const gapHeight = isMobile ? 56 : 64;
      return scrollWrapperHeight(gapHeight + topHeight + bottomHeight);
    },
    handleBottomIntersect(entries: any) {
      this.isBottomIntersect = entries[0].isIntersecting;
    }
  }
});
</script>