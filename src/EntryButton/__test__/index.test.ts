import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import EntryButton from '../';

Vue.use(VueCompositionAPI);

describe('EntryButton', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(EntryButton);
    expect(wrapper).toMatchSnapshot();
  });
});
