import TestUikit from './TestUikit.vue';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type TestUikit = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(TestUikit as TestUikit).install = (app: VueConstructor<Vue>): void => {
  app.component(TestUikit.name, TestUikit);
};

export default TestUikit;
