import VueCompositionAPI from '@vue/composition-api';
import Uikit from '@foxone/uikit';
import PandoLots from './PandoLots';
import UiKitTest from './UiKitTest';

import type { VueConstructor } from 'vue';


install.installed = false;
function install(Vue: VueConstructor<Vue>) {
  if (install.installed) return;
  install.installed = true;
  Vue.use(VueCompositionAPI);
  Vue.use(Uikit);
  Vue.component('PandoLots', PandoLots);
  Vue.component('UiKitTest', UiKitTest);
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
