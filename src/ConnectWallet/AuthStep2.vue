<template>
  <div :class="classes()">
    <component :is="component" />

    <span :class="classes('back')" @click="handleBack">
      <v-icon color="white">$back</v-icon>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator';
import AuthFennecInstall from './AuthFennecInstall.vue';
import { VIcon } from 'vuetify/lib';
import classnames from '@utils/classnames';

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

  protected classes = classnames('auth-step2')

  protected get component() {
    return this.select === 'fennec' ? 'AuthFennecInstall' : '';
  }

  protected handleBack() {
    this.bindStep = 1;
  }
}
export default FAuthStep2;
</script>
