import ImageGallery from './ImageGallery.vue';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type ImageGallery = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(ImageGallery as ImageGallery).install = (app: VueConstructor<Vue>): void => {
  app.component(ImageGallery.name, ImageGallery);
};

export default ImageGallery;
