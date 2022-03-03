import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount } from '@vue/test-utils';
import Stream from '../';

Vue.use(VueCompositionAPI);

describe('Stream', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Stream, {
      propsData: {
        id: 'test',
        urls: {
          hls: 'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4'
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
