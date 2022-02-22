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
import fennec from '@utils/fennec';
import bridge from '@utils/bridge';
import {
  setAuthGroup,
  getAuthGroup,
  removeAuthGroup
} from '@utils/auth';
import { getQuerystring, removeQuery } from '@utils/helper';
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

  @Prop({ type: String, default: '' }) protected groupId!: string;

  protected classes = classnames('connect-wallet');

  protected get btnText () {
    return $t('chat_button');
  }

  public mounted () {
    const code = getQuerystring('pando_lots_code');
    if (code && this.groupId === getAuthGroup()) {
      removeAuthGroup();
      this.$emit('login:mixin', code);
      removeQuery('pando_lots_code');
    }
  }

  protected async handleAuth(type: string) {
    if (type === 'mixin') {
      setAuthGroup(this.groupId);
      bridge.login({
        profile: true,
        messages: true,
        phone: true
      }, {
        client_id: this.clientId,
        state: `pando_lots_url:${location.href}`,
        code_challenge: false
      });
    } else if (type === 'fennec') {
      fennec.connect('Pando Lots');
      const token = await fennec.ctx?.wallet?.signToken({
        payload: { from: 'pando-lots' },
      });
      if (!token) {
        return this.$emit('error', 'fennec invalid token');
      }
      this.$emit('login:fennec', token);
    }
  }
}
export default ConnectWallet;
</script>
