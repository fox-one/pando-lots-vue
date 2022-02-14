import HelloModel from './HelloModel.vue';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type HelloModel = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(HelloModel as HelloModel).install = (app: VueConstructor<Vue>): void => {
  app.component(HelloModel.name, HelloModel);
};

export default HelloModel;
