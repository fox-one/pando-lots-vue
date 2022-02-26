<template>
  <div :class="[classes(void 0, 'd-flex flex-column justify-center align-center'), classes(isMobile ? 'mobile' : 'pc')].join(' ')" @click.stop>
    <f-scroll
      :pulldown="false"
      :pullup="false"
      :max-height="height"
      class="flex-grow-0"
      style="width: 100%"
    >
      <v-layout class="px-12" column align-center justify-center>
        <v-img :class="classes('bg', 'mb-10')" :src="bgSrc" />
        <h1 :class="classes('title', 'mb-6')">{{ txt.title }}</h1>
        <p :class="classes('desc', 'mb-6')">{{ txt.desc }}</p>
        <p :class="classes('rule', 'pl-7 mb-6')">{{ txt.rule1 }}</p>
        <p :class="classes('rule', 'pl-7 mb-6')">{{ txt.rule2 }}</p>
        <p :class="classes('rule', 'pl-7 mb-0')">{{ txt.rule3 }}</p>
      </v-layout>
    </f-scroll>
    <div :class="classes('btn-wrapper', 'pt-12')">
      <div :class="classes('btn')" @click="$emit('click')">{{ txt.btn }}</div>
    </div>
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