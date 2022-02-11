import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import Wrapper from '../';

Vue.use(VueCompositionAPI);

describe('Wrapper', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Wrapper);
    expect(wrapper).toMatchSnapshot();
  });
});
