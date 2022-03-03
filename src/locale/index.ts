const defaultLocales = {
  en: {
    install: 'Install',
    members: 'members',
    learn_more: 'Learn more',
    chat_title: 'Community’s Mixin id is {id}',
    chat_button: 'Connect wallet to chat',
    chat_only_operator_speak: 'Only operators can speak',
    chat_only_mixin: 'The message only visible on Mixin Messenger.<br /> {learn_more}',
    chat_limit: 'Only the recent {total} messages are kept. You can join the corresponding Mixin community to stay in touch.',
    chat_placeholder: 'Wirte a reply',
    disconnect_wallet: 'Disconnect Wallet',
    connect_title: 'Conncet Wallet',
    connect_subtitle: 'Connect with one of our available wallet providers.',
    hello_title: 'Welcome to Pando Lots',
    hello_desc: 'Pando Lots, a messaging platform for users to simply and instantly message each other. Before we start, here are some rules you should be aware of:',
    hello_rules_1: 'Chat content will be publicly visible. Please do not share confidential information.',
    hello_rules_2: 'Only the recent {total} messages are kept. You can join the corresponding Mixin community to stay in touch.',
    hello_rules_3: 'This is a community for everyone. Please be kind.',
    hello_button: 'I Understand',
    fennec_not_installed: 'Fennec not installed',
    fennec_introduction: 'Fennec is a Mixin network browser wallet, you need to install Fennec before the connection.'
  },
  zh: {
    install: '安裝',
    members: '人',
    learn_more: '了解更多',
    chat_title: '该社区的 Mixin id 是 {id}',
    chat_button: '连接钱包参与聊天',
    chat_only_operator_speak: '只有管理员可以发言',
    chat_only_mixin: '该信息只在Mixin Messenger上可见。<br /> {learn_more}',
    chat_limit: '仅保留最近{total}条消息。你可以加入相应Mixin社群保持联络。',
    chat_placeholder: '回复',
    disconnect_wallet: '断开钱包连接',
    connect_title: '连接钱包',
    connect_subtitle: '选择可用的钱包之一。',
    hello_title: '欢迎来到 Pando Lots',
    hello_desc: 'Pando Lots，是一个供用户简单、即时地相互留言的消息平台。在我们开始之前，这里有一些你应该注意的规则:',
    hello_rules_1: '聊天内容将是公开可见的。请不要分享敏感信息。',
    hello_rules_2: '仅保留最近{total}条消息。你可以加入相应Mixin社群保持联络。',
    hello_rules_3: '这是一个为所有人服务的社区。请友善一些。',
    hello_button: '我已了解',
    fennec_not_installed: '沒有安裝',
    fennec_introduction: 'Fennec 是一個 Mixin 網絡瀏覽器錢包，連接前需要安裝 Fennec。'
  },
  ja: {
    install: 'Install',
    members: '成員',
    learn_more: '詳細はこちら',
    chat_title: 'Communityの Mixin ID は {id}',
    chat_button: 'コネクトウォレット・エンゲージチャット',
    chat_only_operator_speak: 'オペレーターのみが発言可能',
    chat_only_mixin: 'Mixinメッセンジャーにのみ表示されるメッセージです。<br /> {learn_more}',
    chat_limit: '最近の{total}メッセージのみが保持されます。対応する Mixin コミュニティに参加することで、連絡を取り合うことができます。',
    chat_placeholder: '返信',
    disconnect_wallet: 'ウォレットを切断',
    connect_title: 'コンセトウォレット',
    connect_subtitle: 'ウォレットプロバイダーと接続する。',
    hello_title: 'ようこそ Pando Lots',
    hello_desc: 'Pando Lots, ユーザーが簡単かつ即座にメッセージをやり取りできるメッセージングプラットフォームです。始める前に、いくつか知っておくべきルールを紹介します:',
    hello_rules_1: 'チャットの内容は一般に公開されます。機密情報の共有はご遠慮ください。',
    hello_rules_2: '最近の{total}メッセージのみが保持されます。対応する Mixin コミュニティに参加することで、連絡を取り合うことができます。',
    hello_rules_3: 'ここはみんなのコミュニティです。親切にお願いします。',
    hello_button: 'ヴォイ・イ・ランジ',
    fennec_not_installed: 'Fennec not installed',
    fennec_introduction: 'Fennec is a Mixin network browser wallet, you need to install Fennec before the connection.'
  },
};

const getCurrentLocale = function () {
  const lang = window.navigator.language;
  return lang.slice(0, 2);
};

export const $t = function (key: keyof typeof defaultLocales['en'], value: Record<string, string> = {}) {
  const locale = getCurrentLocale() as keyof typeof defaultLocales;
  let data = defaultLocales[locale][key] || key;
  Object.keys(value).forEach((k) => {
    data = data.replace(`{${k}}`, value[k]);
  });
  return data;
};

export default {
  getCurrentLocale,
  $t,
};
