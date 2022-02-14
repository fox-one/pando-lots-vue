import { storiesOf } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import Chat from '../';
import '../style';


const chats =
  storiesOf('Chat', module)
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
        Chat
      },
      data: () => ({
        chats: [
          {
            name: 'Luong Danh',
            create_at: Date.now(),
            content: `please help me to get the wallet address, i can't find it in fennec wallet`,
            origin: 'mixin'
          },
          {
            name: '0x22E8uu823eysc43ff746f08',
            create_at: Date.now() + 10000,
            content: `Hello~I’m from Fennec`,
            origin: 'fennec'
          }
        ]
      }),
      template: `<chat :chats="chats" />`
    }));
