import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import Auth from '../';

Vue.use(VueCompositionAPI);

describe('Auth', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Auth);
    expect(wrapper).toMatchSnapshot();
  });
});
