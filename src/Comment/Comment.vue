<template>
  <v-layout :class="classes(void 0, 'pa-6')" column>
    <v-layout class="mb-6" justify-space-between align-center>
      <v-text-field
        v-model="val"
        filled
        rounded
        :placeholder="placeholder"
        :class="classes('input')"
        clear-icon="$close"
        clearable
        height="50px"
        @focus="isFocus = true"
        @blur="isFocus = false"
      />
      <div v-if="isFocus" :class="classes('btn', 'ml-3 d-flex align-center justify-center')" @click="$emit('click:send')">
        <f-icon-send-fill />
      </div>
    </v-layout>
    <v-layout justify-space-between align-center>
      <v-layout align-center>
        {{ name }}
        <f-icon-setting class="ml-2" style="width: 24px; height: 24px" @click="$emit('click:setting')" />
      </v-layout>
      <f-icon-picture style="width: 24px; height: 24px" @click="$emit('click:picture')" />
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch
} from '@vue/composition-api';
import { VLayout, VTextField } from 'vuetify/lib';
import { FIconSetting, FIconPicture, FIconSendFill } from '@foxone/icons';
import classnames from '@utils/classnames';
import { $t } from '@locale/index';

export default defineComponent({
  name: 'Comment',
  components: {
    VLayout,
    VTextField,
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
    }
  },
  setup(props, ctx) {
    const classes = classnames('comment');
    const placeholder = $t('chat_placeholder');
    const isFocus = ref(false);
    const val = ref('');
    watch(val, () => {
      ctx.emit('input', val.value);
    });

    return { classes, placeholder, isFocus, val };
  },
  watch: {
    value: function (val) {
      if (val !== this.val) this.val = val;
    }
  }
});
</script>