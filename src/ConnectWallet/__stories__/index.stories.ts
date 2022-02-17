import { storiesOf } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import ConnectWallet from '../';
import '../style';

storiesOf('ConnectWallet', module)
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
      ConnectWallet
    },
    template: `<connect-wallet>
      <template #activator="{ on }">
        <v-btn color="primary" v-on="on">Connect Wallet</v-btn>
      </template>
    </connect-wallet>`
  }));
