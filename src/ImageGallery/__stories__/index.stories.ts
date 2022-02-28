import { storiesOf } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import ImageGallery from '../';
import '../style';

storiesOf('ImageGallery', module)
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
  .add('basic usage', () => {
    return ({
      components: {
        ImageGallery
      },
      data() {
        return {
          isShow: false
        }
      },
      methods: {
        handleClick() {
          (this as any).isShow = !(this as any).isShow;
        }
      },
      template: `<div>
        <v-img style='width: 60px; height: 60px; cursor: pointer' src='https://pando.im/favicon.png' @click="handleClick" />
        <image-gallery
          :isOpen="isShow"
          :index="0"
          :items="[{
            src: 'https://pando.im/favicon.png',
            w: 120,
            h: 120
          }]"
        />
      </div>`
    })
  });
