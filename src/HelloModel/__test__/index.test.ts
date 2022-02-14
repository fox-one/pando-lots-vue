import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import HelloModel from '../';

Vue.use(VueCompositionAPI);

describe('HelloModel', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(HelloModel);
    expect(wrapper).toMatchSnapshot();
  });
});
