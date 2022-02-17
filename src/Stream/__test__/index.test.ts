import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import Stream from '../';

Vue.use(VueCompositionAPI);

describe('Stream', () => {
  it('renders correctly', () => {
    const wrapper = mount(Stream);
    expect(wrapper).toMatchSnapshot();
  });
});
