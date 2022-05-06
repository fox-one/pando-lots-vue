<template>
  <f-auth-method-modal 
    :fennec="hasFennec"
    :client-id="clientId"
    :scope="scope"
    :is-firesbox="false"
    @auth="handleAuth"
    @error="handleError"
  >
    <template #activator="{ on }">
      <div :class="classes(void 0, 'd-flex align-center justify-center')">
        <f-button :loading="loading" height="56" :class="classes('btn')" v-on="on"> {{ btnText }} </f-button>
      </div>
    </template>
  </f-auth-method-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VIcon } from 'vuetify/lib';
import classnames from '@utils/classnames';
import fennec from '@utils/fennec';
import { $t } from '@locale/index';

@Component({
  name: 'ConnectWallet',
  inheritAttrs: false,
  components: {
    VIcon
  }
})
class ConnectWallet extends Vue {
  @Prop({ type: String, default: '' }) protected clientId!: string;

  @Prop({ type: String, default: '' }) protected groupId!: string;

  @Prop({ type: Boolean, default: false }) protected loading!: boolean;

  @Prop({ type: String, default: 'PROFILE:READ+MESSAGES:REPRESENT' }) protected scope!: string;

  protected hasFennec = false;

  protected classes = classnames('connect-wallet');

  protected get btnText () {
    return $t('chat_button');
  }

  public mounted () {
    setTimeout(() => {
      this.hasFennec = fennec?.isAvailable() ?? false;
    }, 200);
  }

  protected async handleAuth({type, code}) {
    if (type === 'mixin') {
      this.$emit('login:mixin', code);
    } else if (type === 'fennec') {
      await fennec.connect('Pando Lots');
      setTimeout(async () => {
        const token = await fennec.ctx?.wallet?.signToken({
          payload: { from: 'pando-lots' },
        });
        if (!token) {
          return this.$emit('error', { message: 'fennec invalid token' });
        }
        this.$emit('login:fennec', token);
      }, 300);
    }
  }

  protected handleError(err) {
    this.$emit('error');
  }
}
export default ConnectWallet;
</script>
