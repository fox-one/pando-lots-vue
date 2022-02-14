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
  name: 'HelloModel',
  props: {
    prefixCls: {
      type: String,
      default: 'hellomodel'
    }
  },
  setup(props) {
    const classes = classnames(props.prefixCls);
    onMounted(() => {
      console.info('HelloModel mounted!');
    });

    return { classes };
  }
});
</script>