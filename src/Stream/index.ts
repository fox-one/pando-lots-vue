import Stream from './Stream.vue';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type Stream = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(Stream as Stream).install = (app: VueConstructor<Vue>): void => {
  app.component(Stream.name, Stream);
};

export default Stream;
