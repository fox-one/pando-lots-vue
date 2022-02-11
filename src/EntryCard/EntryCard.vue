<template>
  <v-layout :class="classes(void 0, 'pa-4')" row align-center @click="$emit('click')">
    <div :class="[classes('left', 'mr-4'), classes(type)].join(' ')" :style="`backgroundColor: ${themeColor};`" />
    <v-layout column align-start>
      <h3 :class="classes('title')">{{ title }}</h3>
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
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType
} from '@vue/composition-api';
import classnames from '@utils/classnames';
import { VAvatar, VLayout, VImg } from 'vuetify/lib';
import { $t } from '@locale/index';
import { toThousandSeparator } from '@utils/number';

export default defineComponent({
  name: 'EntryCard',
  components: {
    VAvatar,
    VLayout,
    VImg,
  },
  props: {
    title: {
      type: String,
      default: '#XXX',
    },
    members: {
      type: Object as PropType<{
        avatars: string[];
        total: number;
      }>,
      default: {
        avatars: ['', '', ''],
        total: 0,
      } as {
        avatars: string[];
        total: number;
      },
    },
    themeColor: {
      type: String,
      default: '#F5F5F5',
    },
    type: {
      type: String,
      default: 'chat',
    },
    prefixCls: {
      type: String,
      default: 'entrycard'
    }
  },
  setup(props) {
    const { 
      members,
      prefixCls
    } = props;
    const classes = classnames(prefixCls);
    onMounted(() => {
      console.info('EntryCard mounted!');
    });
    const avatars = members.avatars || [];
    while(avatars.length < 3) {
      avatars.push('');
    }

    return { classes, memberTxt: `${toThousandSeparator(members.total)} ${$t('members')}`, avatars };
  }
});
</script>