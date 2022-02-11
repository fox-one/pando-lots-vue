import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import Comment from '../';

Vue.use(VueCompositionAPI);

describe('Comment', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Comment);
    expect(wrapper).toMatchSnapshot();
  });
});
