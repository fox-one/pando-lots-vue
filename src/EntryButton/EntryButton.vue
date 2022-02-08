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
  name: 'EntryButton',
  props: {
    prefixCls: {
      type: String,
      default: 'entrybutton'
    }
  },
  setup(props) {
    const classes = classnames(props.prefixCls);
    onMounted(() => {
      console.info('EntryButton mounted!');
    });

    return { classes };
  }
});
</script>