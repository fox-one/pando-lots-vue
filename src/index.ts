import VueCompositionAPI from '@vue/composition-api';
import ConnectWallet from './ConnectWallet';
import PandoLots from './PandoLots';

import type { VueConstructor } from 'vue';


install.installed = false;
function install(Vue: VueConstructor<Vue>) {
  if (install.installed) return;
  install.installed = true;
  Vue.use(VueCompositionAPI);
  Vue.component('PandoLots', PandoLots);
  Vue.component('ConnectWallet', ConnectWallet);
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
