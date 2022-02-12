<template>
  <div :class="classes()">
    <f-scroll
      :pulldown="false"
      :pullup="false"
      :height="height"
    >
      <slot name="default" />
    </f-scroll>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted
} from '@vue/composition-api';
import classnames from '@utils/classnames';
import { scrollWrapperHeight } from '@foxone/vue-scroll';
import FScroll from '@foxone/vue-scroll/es/Scroll';

export default defineComponent({
  name: 'Chat',
  components: {
    FScroll
  },
  props: {
    prefixCls: {
      type: String,
      default: 'chat'
    }
  },
  setup(props) {
    const classes = classnames(props.prefixCls);
    onMounted(() => {
      console.info('Chat mounted!');
    });

    return { classes };
  },
  computed: {
    height() {
      return scrollWrapperHeight('50vh');
    }
  }
});
</script>