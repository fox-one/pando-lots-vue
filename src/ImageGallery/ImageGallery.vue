<template>
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"/>
    <div class="pswp__scroll-wrap">
      <div class="pswp__container">
        <div class="pswp__item"/>
        <div class="pswp__item"/>
        <div class="pswp__item"/>
      </div>

      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <div class="pswp__counter"/>

          <button
            class="pswp__button pswp__button--close"
            title="Close (Esc)"
          />

          <button
            class="pswp__button pswp__button--share"
            title="Share"
          />

          <button
            class="pswp__button pswp__button--fs"
            title="Toggle fullscreen"
          />

          <button
            class="pswp__button pswp__button--zoom"
            title="Zoom in/out"
          />

          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"/>
              </div>
            </div>
          </div>
        </div>

        <div
          class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
        >
          <div class="pswp__share-tooltip"/>
        </div>

        <button
          class="pswp__button pswp__button--arrow--left"
          title="Previous (arrow left)"
        />

        <button
          class="pswp__button pswp__button--arrow--right"
          title="Next (arrow right)"
        />

        <div class="pswp__caption">
          <div class="pswp__caption__center"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default.js';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

import type { ImageViewData } from '@utils/image';

const events = [
  'beforeChange',
  'gettingData',
  'mouseUsed',
  'initialZoomIn',
  'initialZoomInEnd',
  'initialZoomOut',
  'initialZoomOutEnd',
  'parseVerticalMargin',
  'close',
  'resize',
  'unbindEvents',
  'destroy',
  'updateScrollOffset',
  'preventDragEvent',
  'shareLinkClick',
];

@Component
export default class ImageGallery extends Vue {
  @Prop({ default: 0, type: Number }) public index!: number;
  @Prop({ default: false, type: Boolean }) public isOpen!: boolean;
  @Prop({ default: [], type: Array, required: true }) public items!: ImageViewData[];
  @Prop({ default: () => ({}), type: Object }) public options!: Record<string, any>;

  public pswp;

  public mounted() {
    if (this.isOpen) this.openPhotoSwipe(this.items, this.options);
  }

  public beforeDestroy() {
    this.close();
  }

  public openPhotoSwipe(items, options) {
    const pswpElement = this.$el;
    this.pswp = new PhotoSwipe(
      pswpElement,
      PhotoSwipeUIDefault,
      items,
      (options = {
        bgOpacity: 0.9,
        loop: false,
        history: false,
        ...options,
        index: this.index,
        shareEl: false,
        tapToClose: true,
        getDoubleTapZoom: function (isMouseClick, item) {
          return isMouseClick ? 1 : item.initialZoomLevel < 0.7 ? 1.5 : 2;
        },
      }),
    );

    this.pswp.listen('imageLoadComplete', (ind, item) => {
      if (item.h < 1 || item.w < 1) {
        let img = new Image();
        img.onload = () => {
          item.w = img.width;
          item.h = img.height;
          this.pswp.invalidateCurrItems();
          this.pswp.updateSize(true);
        };
        img.src = item.src;
      }
      this.$emit('imageLoadComplete', ind, item);
    });

    this.pswp.listen('afterChange', () => {
      const container = this.pswp.currItem.container;
      const containerTransform = container.style.transform;
      if (~containerTransform.indexOf('scale(0)')) {
        this.pswp.currItem.container.style.transform = 'none';
        container.children[0].style.width = '100vw';
      }
      this.$emit('afterChange');
    });

    events.forEach((e) => {
      this.pswp.listen(e, (...args) => {
        args.unshift(this);
        this.$emit(e, [...args]);
      });
    });

    this.pswp.init();
  }

  public close() {
    this.pswp?.close?.();
  }

  @Watch('items', { deep: true })
  protected handleItemChange() {
    if (this.pswp && this.isOpen) {
      this.pswp.invalidateCurrItems();
      this.$nextTick(() => this.pswp.updateSize(true));
    }
  }

  @Watch('isOpen')
  protected handleOpen(isOpen) {
    if (isOpen) {
      this.openPhotoSwipe(this.items, this.options);
    } else {
      this.close();
    }
  }
}
</script>
