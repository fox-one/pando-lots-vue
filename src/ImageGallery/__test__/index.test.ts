import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { mount } from '@vue/test-utils';
import ImageGallery from '../';

Vue.use(VueCompositionAPI);

describe('ImageGallery', () => {
  it('renders correctly', () => {
    const wrapper = mount(ImageGallery, {
      propsData: {
        isOpen: false,
        index: null,
        items: [{
          src: 'https://pando.im/favicon.png',
          w: 120,
          h: 120
        }]
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
