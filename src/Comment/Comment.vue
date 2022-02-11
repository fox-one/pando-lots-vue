<template>
  <div :class="classes()">
    <f-input />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted
} from '@vue/composition-api';
import classnames from '@utils/classnames';

export default defineComponent({
  name: 'Comment',
  props: {
    prefixCls: {
      type: String,
      default: 'comment'
    }
  },
  setup(props) {
    const classes = classnames(props.prefixCls);
    onMounted(() => {
      console.info('Comment mounted!');
    });

    return { classes };
  }
});
</script>