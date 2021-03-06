import Vue from 'vue';
import Vuetify, {
  VApp,
  VBtn,
  VCard,
  VCardActions,
  VCardTitle,
  VCardText,
  VAvatar,
  VCol,
  VContainer,
  VMain,
  VDialog,
  VDivider,
  VIcon,
  VImg,
  VList,
  VListItem,
  VListItemAvatar,
  VListItemContent,
  VListItemIcon,
  VListItemTitle,
  VNavigationDrawer,
  VRow,
  VSheet,
  VSnackbar,
  VSparkline,
  VToolbar,
  VLayout,
  VTextarea
} from 'vuetify/lib';
import {
  FIconChevronLeft,
  FIconChevronRight,
  FIconChevronDown4P,
  FIconClose,
  FIconConnect3PFill,
  FIconUpRight3PFill,
  FIconInformation3PFill,
  FIconWarningFill,
  FIconArrowRight4P,
  FIconClear3PFill,
  FIconArrowDown,
  FIconSearch,
  FIconHelp3PFill,
  FIconCheck4P,
  FIconInfo4P,
  FIconLink4P,
  FIconImport4PBold,
  FIconAlert4P
} from "@foxone/icons";
import Uikit from '@foxone/uikit';
import UikitLang from '@foxone/uikit/src/locales';
import "@foxone/uikit/build/index.min.css";

import zh from 'vuetify/es5/locale/zh-Hans';
import en from 'vuetify/es5/locale/en';
import ja from 'vuetify/es5/locale/ja';

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VCard,
    VCardActions,
    VCardTitle,
    VCardText,
    VAvatar,
    VCol,
    VContainer,
    VMain,
    VDialog,
    VDivider,
    VIcon,
    VImg,
    VList,
    VListItem,
    VListItemAvatar,
    VListItemContent,
    VListItemIcon,
    VListItemTitle,
    VNavigationDrawer,
    VRow,
    VSheet,
    VSnackbar,
    VSparkline,
    VToolbar,
    VLayout,
    VTextarea
  }
});
Vue.use(Uikit);

export default function () {
  const isDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

  return new Vuetify({
    icons: {
      iconfont: "mdiSvg",
      values: {
        back: { component: FIconChevronLeft },
        next: { component: FIconChevronRight },
        arrowRight: { component: FIconArrowRight4P },
        close: { component: FIconClose },
        clear: { component: FIconClear3PFill },
        expand: { component: FIconChevronDown4P },
        swap: { component: FIconArrowDown },
        connect: { component: FIconConnect3PFill },
        fill: { component: FIconUpRight3PFill },
        help: { component: FIconInformation3PFill },
        warning: { component: FIconWarningFill },
        search: { component: FIconSearch },
        question: { component: FIconHelp3PFill },
        check: { component: FIconCheck4P },
        info: { component: FIconInfo4P },
        link: { component: FIconLink4P },
        install: { component: FIconImport4PBold },
        alert: { component: FIconAlert4P }
      }
    },
    theme: {
      dark: false,
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          primary: "#00CEB7",
          secondary: "#003d69",
          accent: "#169CFE",
          minor: "#EDEDED",
          // greyscale
          greyscale_1: "#000000",
          greyscale_2: "#494949",
          greyscale_3: "#808080",
          greyscale_4: "#cccccc",
          greyscale_5: "#ebebeb",
          greyscale_6: "#f5f5f5",
          greyscale_7: "#FFFFFF",
          // error & warning
          error: "#f44c4c",
          success: "#00c7af",
          warning: "#FC8A22",
          // general color
          yellow: "#fadf8b",
          purple: "#c699e6",
          blue: "#076AFF",
          gray: "#b9b9bc",
          green: "#15D8B4",
          red: "#f39086",
        },
        dark: {
          primary: "#00CEB7",
          secondary: "#6F767C",
          minor: "#4B4B4B",
          danger: "#EA5858",
          // greyscale
          greyscale_1: "#ffffff",
          greyscale_2: "#D8D8D8",
          greyscale_3: "#9F9F9F",
          greyscale_4: "#656565",
          greyscale_5: "#3C3C3C",
          greyscale_6: "#303030",
          greyscale_7: "#000000",
          // error & warning
          error: "#f67070",
          success: "#33d2bf",
          warning: "#FC8A22",
          // general color
          yellow: "#d8ba44",
          purple: "#9d5bcb",
          blue: "#3988FF",
          gray: "#87868a",
          green: "#32EBC9",
          red: "#ce4d40",
        },
      },
    },
    lang: {
      locales: {
        zh: {
          ...zh,
          ...UikitLang.zh
        },
        en: {
          ...en,
          ...UikitLang.en
        },
        ja: {
          ...ja,
          ...UikitLang.ja
        },
      },
    },
  });
}
