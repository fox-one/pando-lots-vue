import {
  defineComponent,
  onMounted,
  ref
} from '@vue/composition-api';
import { VMenu, VBottomSheet } from 'vuetify/lib'
import classnames from '@utils/classnames';
import { isMobile } from '@utils/ua';
/* import types */
import type { CreateElement, VNode } from 'vue';

export default defineComponent({
  name: 'Wrapper',
  props: {
    prefixCls: {
      type: String,
      default: 'wrapper'
    }
  },
  setup(props) {
    const pcDOM = ref(null);
    const isShow = ref(false);
    const classes = classnames(props.prefixCls);
    onMounted(() => {
      console.info('Wrapper mounted!');
    });
    const handleMenuClick = () => {
      isShow.value = !isShow.value;
    }

    return { classes, pcDOM, isShow, handleMenuClick };
  },
  render(h: CreateElement): VNode {
    const content = this.$slots.default;
    const scopedSlots = {
      activator: this.$scopedSlots.activator
    };
    return (
      isMobile
      ? <VBottomSheet
        class={this.classes('mobile')}
        scopedSlots={scopedSlots}
      >
        { content }
      </VBottomSheet>
      : <div class={this.classes('pc')}>
        <div class={this.classes('pc-menu')} ref='pcDOM'>
          <VMenu
            vModel={this.isShow}
            absoulte={true}
            attach={this.pcDOM}
            positionY={32}
          >
            { content }
          </VMenu>
        </div>
        { scopedSlots.activator?.({
          on: {
            click: this.handleMenuClick,
            value: this.isShow
          }
        }) }
      </div>
    );
  }
});