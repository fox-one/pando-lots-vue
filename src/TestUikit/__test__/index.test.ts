import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import TestUikit from '../';

Vue.use(VueCompositionAPI);

describe('TestUikit', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(TestUikit);
    expect(wrapper).toMatchSnapshot();
  });
});
