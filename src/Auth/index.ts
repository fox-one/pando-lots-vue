import Auth from './Auth.vue';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type Auth = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(Auth as Auth).install = (app: VueConstructor<Vue>): void => {
  app.component(Auth.name, Auth);
};

export default Auth;
