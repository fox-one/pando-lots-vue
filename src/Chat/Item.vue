<template>
  <v-layout :class="classes(void 0, classes(type))" align-end >
    <div :class="classes('avatar-wrapper')">
      <v-avatar :size="32" :class="classes('avatar')" >
        <v-img v-if="chat.avatar_url" :src="chat.avatar_url" />
        <f-icon-person v-else style="width: 24px; height: 24px" />
      </v-avatar>
      <i :class="classes('avatar-icon', classes(`avatar-icon-${chat.origin}`))" />
    </div>
    <div class="ml-4">
      <div class="mb-1">
        <span :class="classes('name')">{{ chat.name }}</span>
        <span :class="classes('time')">{{ createAt }}</span>
      </div>
      <div :class="classes('content', 'py-3 px-4')">
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
    type: {
      type: String,
      default: 'others'
    },
    chat: {
      type: Object as PropType<Chat>,
      default: () => ({})
    },
    prefixCls: {
      type: String,
      default: 'chat-item'
    }
  },
  setup(props) {
    const classes = classnames(props.prefixCls);
    const createAt = dayjs(props.chat?.create_at).format('MM/DD HH:mm');

    return { classes, createAt };
  },
  computed: {

  }
});
</script>