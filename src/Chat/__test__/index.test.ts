import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import Chat from '../';

Vue.use(VueCompositionAPI);

describe('Chat', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Chat);
    expect(wrapper).toMatchSnapshot();
  });
});
