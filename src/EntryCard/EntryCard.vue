<template>
  <div :class="classes('wrapper')">
    <content-loader v-if="loading" primary-color="#F5F5F5">
      <rect x="16" y="16" rx="0" ry="0" width="64" height="64" />
      <rect x="96" y="16" rx="3" ry="3" width="120" height="16" /> 
      <rect x="96" y="56" rx="3" ry="3" width="240" height="24" /> 
    </content-loader>
    <v-layout v-else :class="classes(void 0, 'pa-4')" row align-center @click="$emit('click')">
      <div :class="[classes('left', 'mr-4'), classes(status)].join(' ')" :style="`backgroundColor: ${themeColor};`" />
      <v-layout column align-start>
        <h3 :class="classes('title')">{{ `#${title}` }}</h3>
        <div :class="classes('member', 'mt-3')">
          <v-avatar
            v-for="(url, index) in avatars"
            v-show="index < 3"
            :key="index"
            :class="classes('member-avatar', index === 0 ? '' : 'ml-n4')"
            size="36"
          >
            <v-img v-if="url" :src="url" />
            <i v-else :class="classes('member-avatar-placeholder')" />
          </v-avatar>
          <span :class="classes('member-total', 'ml-3')">{{ memberTxt }}</span>
        </div>
      </v-layout>
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
import { VAvatar, VLayout, VImg } from 'vuetify/lib';
import { $t } from '@locale/index';
import { toThousandSeparator } from '@utils/number';

export default defineComponent({
  name: 'EntryCard',
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
    title: {
      type: String,
      default: 'XXX',
    },
    members: {
      type: Object as PropType<{
        avatars: string[];
        total: number;
      }>,
      default: () => ({
        avatars: ['', '', ''],
        total: 0,
      } as {
        avatars: string[];
        total: number;
      })
    },
    themeColor: {
      type: String,
      default: '#F5F5F5',
    }
  },
  setup(props) {
    const { members } = props;
    const classes = classnames('entry-card');
    const avatars = members.avatars || [];

    return { classes, avatars };
  },
  computed: {
    memberTxt(): string {
      return `${toThousandSeparator(this.members.total)} ${$t('members')}`;
    }
  }
});
</script>