<template>
  <component
    :is="popup"
    v-model="show"
    max-width="600"
    overlay-opacity="0.46"
    overlay-color="rgb(33, 33, 33)"
  >
    <template #activator="{ on }">
      <slot name="activator" :on="{ ...on, click: onClick }"/>
    </template>

    <div
      :class="classes(void 0, isMobile ? classes('mobile') : '')"
    >
      <auth-step-1
        v-if="step === 1"
        :step.sync="step"
        :select.sync="select"
        :fennec="fennec"
        v-bind="$attrs"
        v-on="$listeners"
        @close="handleClose"
      />

      <auth-step-2
        v-if="step === 2"
        :step.sync="step"
        :select="select"
        v-bind="$attrs"
        v-on="$listeners"
      />
    </div>
  </component>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from '@vue/composition-api';
import bridge from '@utils/bridge';
import classnames from '@utils/classnames';
import { VDialog, VBottomSheet } from 'vuetify/lib';
import { isMobile } from '@utils/ua';
import AuthStep1 from './AuthStep1.vue';
import AuthStep2 from './AuthStep2.vue';

export default defineComponent({
  name: 'Auth',
  components: {
    VDialog,
    VBottomSheet,
    AuthStep1,
    AuthStep2
  },
  props: {
    clientId: {
      type: String,
      default: ''
    },
    fennec: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const classes = classnames('auth');
    const show = ref(false);
    const step = ref(1);
    const select = ref('');

    return { classes, isMobile, show, step, select };
  },
  computed: {
    popup() {
      return isMobile ? VBottomSheet : VDialog;
    }
  },
  watch: {
    show(val) {
      if (!val) {
        this.step = 1;
        this.select = '';
      }
    }
  },
  methods: {
    onClick() {
      if (bridge.isMixin) {
        bridge.login({
          profile: true,
          messages: true,
          phone: true
        }, { client_id: this.clientId });
      } else {
        this.show = true;
      }
    },
    handleClose() {
      this.show = false;
    }
  }
});
</script>