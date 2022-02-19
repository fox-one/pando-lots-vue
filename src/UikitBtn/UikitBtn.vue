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
  name: 'UikitBtn',
  props: {
    prefixCls: {
      type: String,
      default: 'uikitbtn'
    }
  },
  setup(props) {
    const classes = classnames(props.prefixCls);
    onMounted(() => {
      console.info('UikitBtn mounted!');
    });

    return { classes };
  }
});
</script>