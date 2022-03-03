import { storiesOf } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import Stream from '../';
import '../style';

storiesOf('Stream', module)
  .addParameters({
    readme: {
      sidebar: require('../README.md').default,
      highlightSidebar: true,
      codeTheme: 'github'
    },
    options: { theme: themes.light },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6'
    }
  })
  .add('basic usage', () => ({
    components: {
      Stream
    },
    template: `<stream :urls="{
      'hls': 'https://pili-live-hls.pub-streaming.firesbox.com/xuexi-public/7000103413.m3u8',
      'hls@480p': 'https://pili-live-hls.pub-streaming.firesbox.com/xuexi-public/7000103413@480p.m3u8',
      'hls@720p': 'https://pili-live-hls.pub-streaming.firesbox.com/xuexi-public/7000103413@720p.m3u8'
    }"/>`
  }));
