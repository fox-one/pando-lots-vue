import UiKitTest from './UiKitTest.vue';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type UiKitTest = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(UiKitTest as UiKitTest).install = (app: VueConstructor<Vue>): void => {
  app.component(UiKitTest.name, UiKitTest);
};

export default UiKitTest;
