import {
  defineComponent,
  ref
} from '@vue/composition-api';
import {
  VMenu,
  VBottomSheet,
  VCard,
  VCardText
} from 'vuetify/lib'
import { FIconClose4P } from "@foxone/icons";
import classnames from '@utils/classnames';
import { isMobile } from '@utils/ua';
/* import types */
import type { CreateElement, VNode } from 'vue';

export default defineComponent({
  name: 'Wrapper',
  setup() {
    const wapperPC = ref(null);
    const wapperMobile = ref(null);
    const isShow = ref(false);
    const classes = classnames('wrapper');
    const handleActivatorClick = () => {
      isShow.value = !isShow.value;
    }
    const handleClose = () => {
      isShow.value = false;
    }
    
    return { classes, wapperPC, wapperMobile, isShow, handleActivatorClick, handleClose };
  },
  render(h: CreateElement): VNode {
    const content = this.$slots.default;
    const scopedSlots = {
      activator: this.$scopedSlots.activator
    };
    return (
      <div class={this.classes()}>
        {
        isMobile
          ? <div class={this.classes('mobile')} ref='wapperMobile'>
            <VBottomSheet
              vModel={this.isShow}
              overlayColor="#000000"
              overlayOpacity={0.8}
              attach={this.wapperMobile}
            >
              <VCard class={this.classes('mobile-content')}>
                <i class={this.classes('mobile-close', 'd-flex align-center justify-center')} vOn:click={this.handleClose}>
                  <FIconClose4P />
                </i>
                <VCardText>
                  { content }
                </VCardText>
              </VCard>
            </VBottomSheet>
          </div>
          : <div class={this.classes('pc')} ref='wapperPC'>
            <VMenu
              vModel={this.isShow}
              absoulte={true}
              attach={this.wapperPC}
              positionY={32}
            >
              <VCard class={this.classes('pc-content')}>
                <i class={this.classes('pc-close', 'd-flex align-center justify-center')} vOn:click={this.handleClose}>
                  <FIconClose4P />
                </i>
                <VCardText>
                  { content }
                </VCardText>
              </VCard>
            </VMenu>
          </div>
        }
        { scopedSlots.activator?.({
          on: {
            click: this.handleActivatorClick,
            value: this.isShow
          }
        }) }
      </div>
    );
  }
});