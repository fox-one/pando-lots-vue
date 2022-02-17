<template>
  <div :class="classes('wrapper')">
    <content-loader v-if="loading" primary-color="#F5F5F5">
      <rect x="16" y="16" rx="0" ry="0" width="380" height="200" />
    </content-loader>
    <v-layout v-else align-center :class="classes(void 0, 'pa-3')" @click="$emit('click')">
      <v-avatar
        v-for="(url, index) in avatars"
        v-show="index < 3"
        :key="index"
        :class="classes('avatar', index === 0 ? classes(type) : 'ml-n4')"
        size="36"
      >
        <v-img v-if="url" :src="url" />
        <i v-else :class="classes('member-avatar-placeholder')" />
      </v-avatar>
      <span :class="classes('total', 'ml-3')">{{ total }}</span>
    </v-layout>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType
} from '@vue/composition-api';
import { ContentLoader } from 'vue-content-loader';
import classnames from '@utils/classnames';
import { toThousandSeparator } from '@utils/number';
import { VAvatar, VLayout, VImg } from 'vuetify/lib';

export default defineComponent({
  name: 'EntryButton',
  components: {
    ContentLoader,
    VAvatar,
    VLayout,
    VImg,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'chat',
    },
    members: {
      type: Object as PropType<{
        avatars: string[];
        total: number;
      }>,
      default: () => ({
        avatars: ['', ''],
        total: 0,
      } as {
        avatars: string[];
        total: number;
      })
    }
  },
  setup(props) {
    const { members } = props;
    const classes = classnames('entry-button');

    const avatars = members.avatars || [];
    while(avatars.length < 2) {
      avatars.push('');
    }
    avatars.unshift('');

    return { classes, total: toThousandSeparator(members.total), avatars };
  }
});
</script>