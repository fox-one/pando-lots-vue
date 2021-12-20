import Chat from './Chat.vue';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type Chat = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(Chat as Chat).install = (app: VueConstructor<Vue>): void => {
  app.component(Chat.name, Chat);
};

export default Chat;
