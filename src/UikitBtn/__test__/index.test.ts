import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import UikitBtn from '../';

Vue.use(VueCompositionAPI);

describe('UikitBtn', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(UikitBtn);
    expect(wrapper).toMatchSnapshot();
  });
});
