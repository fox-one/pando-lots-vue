import { storiesOf } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import PandoLots from '../';
import '../style';

storiesOf('PandoLots', module)
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
  .add('card', () => ({
    components: {
      PandoLots
    },
    template: `<pando-lots group-id="7000103413" theme-color="#EE4596" />`
  }))
  .add('button', () => ({
    components: {
      PandoLots
    },
    template: `<pando-lots group-id="7000103413" type="button" />`
  }));
