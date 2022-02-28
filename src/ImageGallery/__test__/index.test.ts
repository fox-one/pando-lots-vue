import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import ImageGallery from '../';

Vue.use(VueCompositionAPI);

describe('ImageGallery', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ImageGallery);
    expect(wrapper).toMatchSnapshot();
  });
});
