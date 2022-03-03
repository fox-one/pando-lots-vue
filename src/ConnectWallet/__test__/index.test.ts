import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import ConnectWallet from '../';
import Uikit from '@foxone/uikit';

Vue.use(VueCompositionAPI);
Vue.use(Uikit);

describe('ConnectWallet', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ConnectWallet);
    expect(wrapper).toMatchSnapshot();
  });
});
