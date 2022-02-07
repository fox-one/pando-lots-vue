import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import EntryCard from '../';

Vue.use(VueCompositionAPI);

describe('EntryCard', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(EntryCard);
    expect(wrapper).toMatchSnapshot();
  });
});
