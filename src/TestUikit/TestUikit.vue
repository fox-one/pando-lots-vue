<template>
  <f-button color="primary" :class="classes()">
    <slot name="default" />
  </f-button>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted
} from '@vue/composition-api';
import classnames from '@utils/classnames';

export default defineComponent({
  name: 'TestUikit',
  props: {
    prefixCls: {
      type: String,
      default: 'test-uikit'
    }
  },
  setup(props) {
    const classes = classnames(props.prefixCls);
    onMounted(() => {
      console.info('TestUikit mounted!');
    });

    return { classes };
  }
});
</script>