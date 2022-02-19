import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import UiKitTest from '../';

Vue.use(VueCompositionAPI);

describe('UiKitTest', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(UiKitTest);
    expect(wrapper).toMatchSnapshot();
  });
});
