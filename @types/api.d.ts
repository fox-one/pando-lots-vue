declare namespace API {
  export type MessageType = 'PLAIN_TEXT' | 'PLAIN_IMAGE';

  export type UserState = 'pending' | 'paid' | 'unverified' | 'blocked';

  export type Role = 'owner' | 'admin' | 'lecturer' | 'user';

  export interface Message {
    id: string;
    speaker_name: string;
    speaker_avatar: string;
    speaker_id: string;
    category: MessageType;
    data: string;
    text: string;
    attachment: {
      id: string;
      size: number;
      mime_type: string;
      view_url: string;
      thumb_url: string;
    };
    created_at: string;
  }

  export interface GroupInfo {
    identity_number: string;
    client_id: string;
    name: string;
    announcement: string;
    members_count: {
      paid: number;
      unverified: number;
      pending: number;
      total: number;
    };
    mode: string;
    chat_rate_limit: number;
    pay_to_join: boolean;
    invite_to_join: boolean;
    invite_code_required: boolean;
    renew_enabled: boolean;
    payments: {
      type: string;
      payment_url: string;
      asset: {
        asset_id: string;
        chain_id: string;
        updated_at: string;
        symbol: string;
        name: string;
        icon_url: string;
        price_btc: string;
        price_usd: string;
        price_cny: string;
        balance: string;
      };
      price: string;
      price_estimated: string;
      estimated_currency: string;
    }[];
    features: string[];
    product_id: number;
    product: {
      id: number;
      icon: string;
      name: string;
      type: string;
      desc: string;
      quantity: number;
      status: string;
      unit: string;
      price: {
        asset_id: string;
        amount: string;
        original_amount: string;
        channels: {
          channel: string;
          asset_id: string;
        }[]
      };
      group_id: string;
      external_id: string;
      series: string;
      service_fee: number;
      created_at: string;
      updated_at: string;
      extra_info: null | Record<string, any>;
    };
    wechat_app_id: string;
    group_bio: string;
    app_info: {
      name: string;
      download_url_ios: string;
      download_url_android: string;
    };
    mixin_oauth_scope: string;
    terms_of_use_url: string;
    privacy_policies_url: string;
    group_agreement_enabled: boolean;
    group_agreement_modal: boolean;
    group_agreement_url: string;
    talkee: {
      client_id: string;
      site_id: number;
    };
    custom_theme: string;
    active_users: {
      user_id: string;
      group_id: string;
      version: number;
      full_name: string;
      bio: string;
      identity_number: number;
      avatar_url: string;
      state: string;
      blocked: number;
      active_at: string;
      subscribed_at: string;
      expired_at: string;
      created_at: string;
      uiam_id: number;
      joined_at: string;
      divided_at: string;
      role: string;
      token: string;
      refresh_token: string;
      provider: string;
      policies: any;
    }[];
  }

  export interface User {
    active_at: string;
    avatar_url: string;
    bio: string;
    blocked: number;
    created_at: string;
    divided_at: string;
    expired_at: string;
    full_name: string;
    group_id: string;
    identity_number: number;
    joined_at: string;
    phone_code: string;
    phone_number: string;
    role: Role;
    state: UserState;
    subscribed_at: string;
    token: string;
    uiam_id: number;
    user_id: string;
    version: number;
    policies: Array<any>;
  }
}