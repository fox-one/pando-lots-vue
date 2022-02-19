import { storiesOf } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import UiKitTest from '../';
import '../style';

storiesOf('UiKitTest', module)
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
      UiKitTest
    },
    template: `<UiKitTest>{{'Hello UiKitTest'}}</UiKitTest>`
  }));
