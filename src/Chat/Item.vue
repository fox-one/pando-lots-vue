<template>
  <v-layout :class="classes(void 0, classes(chat.origin))" align-end>
    <div :class="classes('avatar-wrapper')">
      <v-avatar :size="32" :class="classes('avatar')" >
        <v-img v-if="chat.avatar_url" :src="chat.avatar_url" />
        <f-icon-person v-else style="width: 24px; height: 24px" />
      </v-avatar>
      <i :class="classes('avatar-icon', classes(`avatar-icon-${chat.origin}`))" />
    </div>
    <div :class="classes('data', 'ml-4 flex-grow-0')">
      <div class="mb-1" :class="classes('info')">
        <span :class="classes('name')">{{ chat.name }}</span>
        <span :class="classes('time')">{{ createAt }}</span>
      </div>
      <div v-if="chat.only_mixin" :class="[classes('content', 'py-3 px-4'), classes('content-only-mixin')].join(' ')" v-html="onlyMixinMsg" />
      <v-img
        v-else-if="imgUrl"
        :src="imgUrl"
        width="100%"
        style="cursor: pointer"
        @click="$emit('preview', imgUrl)"
      />
      <div
        v-else
        :class="classes('content', 'py-3 px-4')"
      >
        {{ chat.content }}
      </div>
    </div>
  </v-layout>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType
} from '@vue/composition-api';
import classnames from '@utils/classnames';
import { VLayout, VAvatar, VImg } from 'vuetify/lib';
import { FIconPerson } from '@foxone/icons';
import dayjs from 'dayjs';
import { $t } from '@locale/index';

import type { Chat } from './Chat.vue';

export default defineComponent({
  name: 'Item',
  components: {
    VLayout,
    VAvatar,
    VImg,
    FIconPerson
  },
  props: {
    chat: {
      type: Object as PropType<Chat>,
      default: () => ({})
    },
    download: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { chat, download } = props;
    const classes = classnames('chat-item');
    const createAt = dayjs(chat?.created_at).format('MM/DD HH:mm');
    const onlyMixinMsg = $t('chat_only_mixin', { learn_more: `<a href="${download}" class=${classes('learn-more')}>${$t('learn_more')}</a>` });

    return { classes, createAt, onlyMixinMsg };
  },
  computed: {
    imgUrl(): string {
      return this.chat.category === 'PLAIN_IMAGE' ? this.chat?.attachment?.view_url : '';
    }
  }
});
</script>