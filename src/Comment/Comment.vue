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
        height="51px"
        clearable
        :clear-icon="''"
        @keydown="handleKeyDown"
      >
        <template #append>
          <i v-show="val" @click="handleClear">
            <f-icon-clear-3-p-fill style="cursor: pointer; width: 18px; height: 18px; color: #000" />
          </i>
        </template>
      </v-text-field>
      <div v-if="isShowSend" :class="classes('btn', 'ml-3 d-flex align-center justify-center flex-shrink-0')" @click="handleSend">
        <f-icon-send-fill />
      </div>
    </v-layout>
    <v-layout ref="wrapper" justify-space-between align-center>
      <v-layout align-center>
        {{ name }}
        <v-menu :attach="wrapper" offset-y top nudge-right="8" nudge-top="4">
          <template #activator="{ on }">
            <i class="d-inline-flex" v-on="on" >
              <f-icon-setting class="ml-2" style="width: 24px; height: 24px; cursor: pointer" />
            </i>
          </template>
          <div :class="classes('settings', 'pa-4')" @click="$emit('disconnect')" >{{ settings.disconnect }}</div>
        </v-menu>
      </v-layout>
      <f-loading v-if="uploading" color="#000" :loading="uploading" :class="classes('loading')" />
      <div v-else :class="[classes('upload', 'd-inline-flex'), disabled ? classes('upload-disabled') : ''].join(' ')">
        <input
          type="file"
          :class="classes('upload-input')"
          accept="image/*"
          :disabled="disabled"
          @change="e => $emit('upload', e.target.files)"
        >
        <f-icon-picture style="width: 24px; height: 24px; cursor: pointer" />
      </div>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  PropType
} from '@vue/composition-api';
import { VLayout, VTextField, VMenu } from 'vuetify/lib';
import { FIconSetting, FIconPicture, FIconSendFill, FIconClear3PFill } from '@foxone/icons';
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
    FIconSendFill,
    FIconClear3PFill
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
    uploading: {
      type: Boolean,
      default: false
    },
    themeColor: {
      type: String,
      default: '#F5F5F5',
    },
    value: {
      type: String,
      default: ''
    },
    status: {
      type: String as PropType<'chat' | 'stream' | 'mute' | 'lecturing'>,
      default: 'chat'
    },
  },
  setup(props, ctx) {
    const { value } = props;
    const classes = classnames('comment');
    const isShowSend = ref(false);
    const val = ref(value);
    const wrapper = ref(null);
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

    return { classes, isShowSend, val, wrapper, settings };
  },
  computed: {
    disabled(): boolean {
      return this.status === 'mute' || this.status === 'lecturing';
    },
    placeholder(): string {
      return $t(this.disabled ? 'chat_only_operator_speak' : 'chat_placeholder');
    }
  },
  watch: {
    value: function (val) {
      if (val !== this.val) this.val = val;
    }
  },
  methods: {
    handleSend() {
      if (!this.val) return;
      this.$emit('send', this.val);
      this.val = '';
    },
    handleClear() {
      this.val = '';
      this.$emit('input', '');
    },
    handleKeyDown(e) {
      if (e.keyCode === 13) {
        this.handleSend();
      }
    }
  }
});
</script>