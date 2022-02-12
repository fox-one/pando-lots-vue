import { storiesOf } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import Wrapper from '../';
import '../style';

storiesOf('Wrapper', module)
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
      Wrapper
    },
    template: `<wrapper>
      <template #activator="{ on }">
        <f-button color="warning" v-on="on">Activator</f-button>
      </template>
      <section class='pa-4'>
        <div> Hello Wrapper! </div>
        <div> Hello Wrapper! </div>
        <div> Hello Wrapper! </div>
        <div> Hello Wrapper! </div>
        <div> Hello Wrapper! </div>
        <div> Hello Wrapper! </div>
        <div> Hello Wrapper! </div>
      </section>
    </wrapper>`
  }));
