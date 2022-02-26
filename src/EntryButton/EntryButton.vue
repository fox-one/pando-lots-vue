<template>
  <div :class="classes('wrapper')">
    <div v-if="loading" style="width: 146px; height: 60px">
      <content-loader primary-color="#F5F5F5">
        <circle cx="80" cy="65" r="65" /> 
        <rect x="90" y="0" rx="0" ry="0" width="240" height="130" />
        <circle cx="320" cy="65" r="65" /> 
      </content-loader>
    </div>
    <v-layout v-else align-center :class="classes(void 0, 'py-3 pl-3 pr-4')" @click="$emit('click')">
      <v-avatar
        v-for="(url, index) in avatars"
        v-show="index < 3"
        :key="index"
        :class="classes('avatar', index === 0 ? classes(status) : 'ml-n4')"
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
    status: {
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
    avatars.unshift('');

    return { classes, avatars };
  },
  computed: {
    total(): string {
      return toThousandSeparator(this.members.total);
    }
  }
});
</script>