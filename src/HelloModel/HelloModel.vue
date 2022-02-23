<template>
  <v-layout :class="classes(void 0, 'pa-12')" column align-center justify-center @click.stop>
    <v-img :class="classes('bg', 'mb-10')" :src="bgSrc" />
    <h1 :class="classes('title', 'mb-6')">{{ txt.title }}</h1>
    <p :class="classes('desc', 'mb-6')">{{ txt.desc }}</p>
    <p :class="classes('rule', 'pl-7 mb-6')">{{ txt.rule1 }}</p>
    <p :class="classes('rule', 'pl-7 mb-6')">{{ txt.rule2 }}</p>
    <p :class="classes('rule', 'pl-7 mb-12')">{{ txt.rule3 }}</p>
    <div :class="classes('btn')" @click="$emit('click')">{{ txt.btn }}</div>
  </v-layout>
</template>

<script lang="ts">
import {
  defineComponent
} from '@vue/composition-api';
import classnames from '@utils/classnames';
import { VLayout, VImg } from 'vuetify/lib';
import HelloPic from '@assets/images/png/hello.png';
import { $t } from '@locale/index';

export default defineComponent({
  name: 'HelloModel',
  components: {
    VLayout,
    VImg
  },
  setup(props) {
    const classes = classnames('hello-model');
    const txt = {
      title: $t('hello_title'),
      desc: $t('hello_desc'),
      btn: $t('hello_button'),
      rule1: $t('hello_rules_1'),
      rule2: $t('hello_rules_2'),
      rule3: $t('hello_rules_3'),
    };

    return { classes, bgSrc: HelloPic, txt };
  }
});
</script>