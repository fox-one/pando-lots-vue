<template>
  <div :class="classes()">
    <v-img :src="bg" height="100%" />

    <div :class="classes('right')">
      <div :class="classes('title')">
        {{ labels[0] }}
      </div>
      <div :class="classes('subtitle')">
        {{ labels[1] }}
      </div>
      <f-button color="primary" @click="handleInstall">
        <v-icon size="16" class="mr-1">$install</v-icon>
        {{ labels[2] }}
      </f-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FIconImport4PBold } from '@foxone/icons';
import classnames from '@utils/classnames';
import ua from '@utils/ua';
import { $t } from '@locale/index';
import { VIcon, VImg } from 'vuetify/lib';

@Component({
  name: 'AuthFennecInstall',
  components: {
    VIcon,
    VImg,
    FIconImport4PBold
  }
})
class AuthFennecInstall extends Vue {
  protected bg = 'https://static.fox.one/image/bg_fennec_install.png';

  protected classes = classnames('auth-fennec-install')

  protected get labels() {
    return [
      $t('fennec_not_installed'),
      $t('fennec_introduction'),
      $t('install')
    ];
  }

  protected handleInstall() {
    const url =
      ua.isFirefox
        ? 'https://addons.mozilla.org/firefox/addon/fox_fennec'
        : 'https://chrome.google.com/webstore/detail/fennec/eincngenkhohbbfpkohipekcmnkfamjp';

    window.open(url);
  }
}
export default AuthFennecInstall;
</script>
