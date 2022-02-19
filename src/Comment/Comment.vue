<template>
  <v-layout :class="classes(void 0, 'pa-6')" column>
    <v-layout class="mb-6" justify-space-between align-center>
      <v-text-field
        v-model="val"
        :filled="!disabled"
        :outlined="disabled"
        rounded
        :disabled="disabled"
        :placeholder="placeholder"
        :class="[classes('input'), disabled ? classes('input-disabled') : '' ].join(' ')"
        clear-icon="$close"
        clearable
        height="50px"
      />
      <div v-if="isShowSend" :class="classes('btn', 'ml-3 d-flex align-center justify-center')" @click="handleSend">
        <f-icon-send-fill />
      </div>
    </v-layout>
    <v-layout justify-space-between align-center>
      <v-layout align-center>
        {{ name }}
        <v-menu offset-x offset-y top right>
          <template #activator="{ on }">
            <i class="d-inline-flex" v-on="on" >
              <f-icon-setting class="ml-2" style="width: 24px; height: 24px; cursor: pointer" />
            </i>
          </template>
          <div :class="classes('settings', 'pa-4')" @click="$emit('disconnect')" >{{ settings.disconnect }}</div>
        </v-menu>
      </v-layout>
      <div :class="classes('upload', 'd-inline-flex')">
        <input type="file" :class="classes('upload-input')" accept="image/*" @change="files => $emit('upload', files)" >
        <f-icon-picture style="width: 24px; height: 24px; cursor: pointer" />
      </div>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch
} from '@vue/composition-api';
import { VLayout, VTextField, VMenu } from 'vuetify/lib';
import { FIconSetting, FIconPicture, FIconSendFill } from '@foxone/icons';
import classnames from '@utils/classnames';
import { $t } from '@locale/index';

export default defineComponent({
  name: 'Comment',
  components: {
    VLayout,
    VTextField,
    VMenu,
    FIconSetting,
    FIconPicture,
    FIconSendFill
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  setup(props, ctx) {
    const { value, disabled } = props;
    const classes = classnames('comment');
    const placeholder = $t(disabled ? 'chat_only_operator_speak' : 'chat_placeholder');
    const isShowSend = ref(false);
    const val = ref(value);
    const settings = {
      disconnect: $t('disconnect_wallet')
    };
    watch(val, () => {
      ctx.emit('input', val.value);
      if (val.value) {
        isShowSend.value = true;
      } else {
        isShowSend.value = false;
      }
    });

    return { classes, placeholder, isShowSend, val, settings };
  },
  watch: {
    value: function (val) {
      if (val !== this.val) this.val = val;
    }
  },
  methods: {
    handleSend() {
      this.$emit('send', this.val);
      this.val = '';
    }
  }
});
</script>