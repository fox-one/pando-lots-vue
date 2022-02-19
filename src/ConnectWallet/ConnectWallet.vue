<template>
  <f-auth-method-modal :fennec="fennec" @auth="handleAuth">
    <template #activator="{ on }">
      <div :class="classes(void 0, 'd-flex align-center justify-center')">
        <f-button height="56" :class="classes('btn')" v-on="on"> {{ btnText }} </f-button>
      </div>
    </template>
  </f-auth-method-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VIcon } from 'vuetify/lib';
import classnames from '@utils/classnames';
import bridge from '@utils/bridge';
import { $t } from '@locale/index';

@Component({
  name: 'ConnectWallet',
  inheritAttrs: false,
  components: {
    VIcon
  }
})
class ConnectWallet extends Vue {
  @Prop({ type: Boolean, default: false }) protected fennec!: boolean;

  @Prop({ type: String, default: '' }) protected clientId!: string;

  protected classes = classnames('connect-wallet');

  protected get btnText () {
    return $t('chat_button');
  }

  protected handleAuth(type: string) {
    if (type === 'mixin') {
      bridge.login({
        profile: true,
        messages: true,
        phone: true
      }, { client_id: this.clientId });
    }
  }
}
export default ConnectWallet;
</script>
