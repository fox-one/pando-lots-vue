import EntryCard from './EntryCard.vue';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type EntryCard = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(EntryCard as EntryCard).install = (app: VueConstructor<Vue>): void => {
  app.component(EntryCard.name, EntryCard);
};

export default EntryCard;
