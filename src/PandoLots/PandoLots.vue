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
  name: 'PandoLots',
  props: {
    prefixCls: {
      type: String,
      default: 'pandolots'
    }
  },
  setup(props) {
    const classes = classnames(props.prefixCls);
    onMounted(() => {
      console.info('PandoLots mounted!');
    });

    return { classes };
  }
});
</script>