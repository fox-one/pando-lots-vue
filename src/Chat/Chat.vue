<template>
  <div :class="classes()">
    <slot name="default" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted
} from '@vue/composition-api';
import classnames from '@utils/classnames';

export default defineComponent({
  name: 'Chat',
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
  }
});
</script>