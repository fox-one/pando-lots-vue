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
          'hls': 'https://pili-live-hls.pub-streaming.firesbox.com/xuexi-public/7000103413.m3u8',
          'hls@480p': 'https://pili-live-hls.pub-streaming.firesbox.com/xuexi-public/7000103413@480p.m3u8',
          'hls@720p': 'https://pili-live-hls.pub-streaming.firesbox.com/xuexi-public/7000103413@720p.m3u8'
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
