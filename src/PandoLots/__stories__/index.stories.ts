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
    template: `<div>
      <br /> 
      <br /> 
      <br /> 
      <pando-lots dev group-id="7000103413" theme-color="#EE4596" />
      <br /> 
      <br /> 
      <br /> 
      <pando-lots dev group-id="7000104299" theme-color="#88E108" />
    </div>`
  }))
  .add('button', () => ({
    components: {
      PandoLots
    },
    template: `<div>
      <br /> 
      <br /> 
      <br /> 
      <pando-lots dev group-id="7000103413" type="button" theme-color="#EE4596" />
      <br /> 
      <br /> 
      <br /> 
      <pando-lots dev group-id="7000104299" type="button" theme-color="#88E108" />
    </div>`
  }))
  .add('custom entry', () => ({
    components: {
      PandoLots
    },
    template: `<div>
      <br /> 
      <br /> 
      <br /> 
      <pando-lots dev group-id="7000104299" theme-color="#88E108">
        <template #activator="{ on }">
          <f-button color='primary' v-on="on">
            Custom Entry
          </f-button>
        </template>
      </pando-lots>
    </div>`
  }));
