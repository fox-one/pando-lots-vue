<template>
  <v-layout :class="classes(void 0, 'pa-6')" column>
    <v-layout class="mb-6" justify-space-between align-center>
      <v-text-field
        v-model="value"
        filled
        rounded
        :placeholder="placeholder"
        :class="classes('input')"
        clear-icon="$close"
        clearable
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
        <f-icon-setting class="ml-2" @click="$emit('click:setting')" />
      </v-layout>
      <f-icon-picture @click="$emit('click:picture')" />
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
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
    }
  },
  setup() {
    const classes = classnames('comment');
    const placeholder = $t('chat_placeholder');
    const isFocus = ref(false);

    return { classes, placeholder, isFocus };
  }
});
</script>