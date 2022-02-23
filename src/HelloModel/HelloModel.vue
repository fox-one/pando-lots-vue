<template>
  <div>
    <div v-if="isMobile" style="overflow: hidden; text-align: center">
      <f-scroll
        :pulldown="false"
        :pullup="false"
        :height="height"
      >
        <v-layout :class="[classes(void 0, 'pa-12'), classes('mobile')].join(' ')" column align-center justify-center @click.stop>
          <v-img :class="classes('bg', 'mb-10')" :src="bgSrc" />
          <h1 :class="classes('title', 'mb-6')">{{ txt.title }}</h1>
          <p :class="classes('desc', 'mb-6')">{{ txt.desc }}</p>
          <p :class="classes('rule', 'pl-7 mb-6')">{{ txt.rule1 }}</p>
          <p :class="classes('rule', 'pl-7 mb-6')">{{ txt.rule2 }}</p>
          <p :class="classes('rule', 'pl-7 mb-12')">{{ txt.rule3 }}</p>
        </v-layout>
      </f-scroll>
      <div :class="classes('btn-wrapper')">
        <div :class="classes('btn')" @click="$emit('click')">{{ txt.btn }}</div>
      </div>
    </div>
    <v-layout v-else :class="[classes(void 0, 'pa-12'), classes('pc')].join(' ')" column align-center justify-center @click.stop>
      <v-img :class="classes('bg', 'mb-10')" :src="bgSrc" />
      <h1 :class="classes('title', 'mb-6')">{{ txt.title }}</h1>
      <p :class="classes('desc', 'mb-6')">{{ txt.desc }}</p>
      <p :class="classes('rule', 'pl-7 mb-6')">{{ txt.rule1 }}</p>
      <p :class="classes('rule', 'pl-7 mb-6')">{{ txt.rule2 }}</p>
      <p :class="classes('rule', 'pl-7 mb-12')">{{ txt.rule3 }}</p>
      <div :class="classes('btn')" @click="$emit('click')">{{ txt.btn }}</div>
    </v-layout>
  </div>

</template>

<script lang="ts">
import {
  defineComponent
} from '@vue/composition-api';
import classnames from '@utils/classnames';
import { isMobile } from '@utils/ua';
import { VLayout, VImg } from 'vuetify/lib';
import HelloPic from '@assets/images/png/hello.png';
import FScroll from '@foxone/vue-scroll/es/Scroll';
import { scrollWrapperHeight } from '@foxone/vue-scroll';
import { $t } from '@locale/index';

export default defineComponent({
  name: 'HelloModel',
  components: {
    VLayout,
    VImg,
    FScroll
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
    const height = scrollWrapperHeight('30vh');

    return { classes, bgSrc: HelloPic, isMobile, txt, height };
  }
});
</script>