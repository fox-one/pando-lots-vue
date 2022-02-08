import EntryButton from './EntryButton.vue';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type EntryButton = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(EntryButton as EntryButton).install = (app: VueConstructor<Vue>): void => {
  app.component(EntryButton.name, EntryButton);
};

export default EntryButton;
