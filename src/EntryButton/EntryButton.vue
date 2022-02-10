<template>
  <v-layout align-center :class="classes(void 0, 'pa-3')">
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
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType
} from '@vue/composition-api';
import classnames from '@utils/classnames';
import { toThousandSeparator } from '@utils/number';
import { VAvatar, VLayout, VImg } from 'vuetify/lib';

export default defineComponent({
  name: 'EntryButton',
  components: {
    VAvatar,
    VLayout,
    VImg,
  },
  props: {
    type: {
      type: String,
      default: 'chat',
    },
    members: {
      type: Object as PropType<{
        avatars: string[];
        total: number;
      }>,
      default: {
        avatars: ['', ''],
        total: 0,
      } as {
        avatars: string[];
        total: number;
      },
    },
    prefixCls: {
      type: String,
      default: 'entrybutton'
    }
  },
  setup(props) {
    const { 
      members,
      prefixCls
    } = props;
    const classes = classnames(prefixCls);
    onMounted(() => {
      console.info('EntryButton mounted!');
    });
    const avatars = members.avatars || [];
    while(avatars.length < 2) {
      avatars.push('');
    }
    avatars.unshift('');

    return { classes, total: toThousandSeparator(members.total), avatars };
  }
});
</script>