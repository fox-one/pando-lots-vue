import PandoLots from './PandoLots.vue';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type PandoLots = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(PandoLots as PandoLots).install = (app: VueConstructor<Vue>): void => {
  app.component(PandoLots.name, PandoLots);
};

export default PandoLots;
