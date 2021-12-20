import VueCompositionAPI from '@vue/composition-api';
import Chat from './Chat';
import Stream from './Stream';

import type { VueConstructor } from 'vue';


install.installed = false;
function install (Vue: VueConstructor<Vue>) {
  if (install.installed) return;
  install.installed = true;
  Vue.use(VueCompositionAPI);
  Vue.component('FChat', Chat);
  Vue.component('FStream', Stream);
}

let GlobalVue;
const win = window ?? global;
if (typeof win !== 'undefined') {
  GlobalVue = win.Vue;
}

if (GlobalVue) install(GlobalVue);

export default {
  install
};
