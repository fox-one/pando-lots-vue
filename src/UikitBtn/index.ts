import UikitBtn from './UikitBtn.vue';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type UikitBtn = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(UikitBtn as UikitBtn).install = (app: VueConstructor<Vue>): void => {
  app.component(UikitBtn.name, UikitBtn);
};

export default UikitBtn;
