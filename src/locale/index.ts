const defaultLocales = {
  en: {
    members: 'members',
    learn_more: 'Learn more',
    chat_title: 'Community’s Mixin id is {number}',
    chat_button: 'Connect wallet to chat',
    chat_only_operator_speak: 'Only operators can speak',
    chat_only_mixin: 'The message only visible on Mixin Messenger.',
    chat_placeholder: 'Wirte a reply',
    connect_title: 'Conncet Wallet',
    connect_subtitle: 'Connect with one of our available wallet providers.',
    hello_title: 'Welcome to Pando Lots',
    hello_subtitle: 'Pando lot , a messaging platform for users to simply and instantly message each other. Before we start, here are some rules you should be aware of:',
    hello_rules_1: 'Chat content will be publicly visible. Please do not share confidential information.',
    hello_rules_2: 'Only the most recent 100 messages are kept. To view the full chat history, you can join the corresponding Mixin community.',
    hello_rules_3: 'This is a community for everyone. Please be kind.',
    hello_button: 'I Understand',
  },
  zh: {
    members: '人',
    learn_more: '了解更多',
    chat_title: '该社区的 Mixin id 是 {number}',
    chat_button: '连接钱包参与聊天',
    chat_only_operator_speak: '只有管理员可以发言',
    chat_only_mixin: '该信息只在Mixin Messenger上可见。',
    chat_placeholder: '回复',
    connect_title: '连接钱包',
    connect_subtitle: '选择可用的钱包之一。',
    hello_title: '欢迎来到 Pando Lots',
    hello_subtitle: 'Pando lot ，是一个供用户简单、即时地相互留言的消息平台。在我们开始之前，这里有一些你应该注意的规则:',
    hello_rules_1: '聊天内容将是公开可见的。请不要分享敏感信息。',
    hello_rules_2: '只保留最近的100条信息。要查看完整的聊天历史，你可以加入相应的Mixin社区。',
    hello_rules_3: '这是一个为所有人服务的社区。请友善一些。',
    hello_button: '我已了解',
  },
  ja: {
    members: '成員',
    learn_more: '詳細はこちら',
    chat_title: 'Communityの Mixin ID は {number}',
    chat_button: 'コネクトウォレット・エンゲージチャット',
    chat_only_operator_speak: 'オペレーターのみが発言可能',
    chat_only_mixin: 'Mixinメッセンジャーにのみ表示されるメッセージです。',
    chat_placeholder: '返信',
    connect_title: 'コンセトウォレット',
    connect_subtitle: 'ウォレットプロバイダーと接続する。',
    hello_title: 'ようこそ Pando Lots',
    hello_subtitle: 'Pando lot , ユーザーが簡単かつ即座にメッセージをやり取りできるメッセージングプラットフォームです。始める前に、いくつか知っておくべきルールを紹介します:',
    hello_rules_1: 'チャットの内容は一般に公開されます。機密情報の共有はご遠慮ください。',
    hello_rules_2: '直近の100件のメッセージのみが保存されます。全てのチャット履歴を見るには、対応する Mixin コミュニティに参加することができます。',
    hello_rules_3: 'ここはみんなのコミュニティです。親切にお願いします。',
    hello_button: 'ヴォイ・イ・ランジ',
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
