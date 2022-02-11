import Comment from './Comment.vue';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type Comment = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(Comment as Comment).install = (app: VueConstructor<Vue>): void => {
  app.component(Comment.name, Comment);
};

export default Comment;
