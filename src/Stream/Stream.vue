<template>
  <div :class="classes()">
    <div :id="videoId" :class="classes('player', 'xgplayer-skin-video')" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref
} from '@vue/composition-api';
import classnames from '@utils/classnames';
import HlsPlayer from 'xgplayer-hls.js';
// import './.xgplayer/skin';

export default defineComponent({
  name: 'Stream',
  props: {
    id: {
      type: String,
      default: ''
    },
    urls: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, ctx) {
    const { id, urls } = props;
    const url = urls['hls'] || '';
    const player = ref<HlsPlayer | null>(null);
    const classes = classnames('stream');
    const videoId = id || 'pando-lots-video';
    onMounted(() => {
      player.value = new HlsPlayer({
        url,
        id: videoId,
        isLive: true,
        airplay: true,
        fluid: false,
        height: 198,
        width: '100%',
        playsinline: true,
        controls: true,
        closeVideoTouch: true,
        preload: 'auto',
      });

      const readyUrls = [
        {
          name: 'HD',
          url: urls['hls'],
          default: true,
        },
        {
          name: '480p',
          url: urls['hls@480p'],
          default: false,
        },
        {
          name: '720p',
          url: urls['hls@720p'],
          default: false,
        },
      ];

      player?.value.emit('resourceReady', readyUrls);

      player?.value.on('play', () => {
        ctx.emit('play');
      });

      player?.value.on('playing', () => {
        ctx.emit('playing');
      });

      player?.value.on('pause', () => {
        ctx.emit('pause');
      });

      player?.value.on('ended', () => {
        ctx.emit('ended');
      });

      player?.value.on('error', () => {
        ctx.emit('error', player?.value.error);
      });

      const loadingClass = 'xgplayer-isloading';
      const playerDOM = document.getElementById(videoId);
      player?.value.on('timeupdate', () => {
        // remove player loading class just in case
        const classList = Array.prototype.slice.call(playerDOM?.classList);
        const hasLoadingClass = classList.some((v) => v === loadingClass);
        if (hasLoadingClass) playerDOM?.classList.remove(loadingClass);

        ctx.emit('timeupdate');
      });
    });

    return { player, classes, videoId };
  }
});
</script>