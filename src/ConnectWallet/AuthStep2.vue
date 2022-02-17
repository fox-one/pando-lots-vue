<template>
  <div class="f-auth-step2">
    <component :is="component" />

    <span class="f-auth-step2__back" @click="handleBack">
      <v-icon color="white">$back</v-icon>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator';
import AuthFennecInstall from './AuthFennecInstall.vue';
import { VIcon } from 'vuetify/lib';

@Component({
  name: 'FAuthStep2',
  inheritAttrs: false,
  components: {
    AuthFennecInstall,
    VIcon
  }
})
class FAuthStep2 extends Vue {
  @PropSync('step') protected bindStep;

  @Prop() protected select;

  protected get component() {
    return this.select === 'fennec' ? 'AuthFennecInstall' : '';
  }

  protected handleBack() {
    this.bindStep = 1;
  }
}
export default FAuthStep2;
</script>
