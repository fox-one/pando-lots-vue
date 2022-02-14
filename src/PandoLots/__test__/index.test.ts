import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import PandoLots from '../';

Vue.use(VueCompositionAPI);

describe('PandoLots', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(PandoLots);
    expect(wrapper).toMatchSnapshot();
  });
});
