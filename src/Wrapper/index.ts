import Wrapper from './Wrapper';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type Wrapper = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(Wrapper as Wrapper).install = (app: VueConstructor<Vue>): void => {
  app.component(Wrapper.name, Wrapper);
};

export default Wrapper;
