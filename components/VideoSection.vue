<template>
  <section class="video-section section bg-black relative">
    <iframe
      :src="`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1`"
      :title="`${title} - Professional project video directed by Gene Perez`"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
      class="video-iframe"
    ></iframe>

    <h2 class="absolute z-10 bottom-10 left-10 text-white text-3xl font-bold uppercase">
      {{ title }}
    </h2>
  </section>
</template>

<script setup>
defineProps({
  videoId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
/* Scoped styles remain unchanged */
.video-section {
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  will-change: transform;
  position: relative;
  overflow: hidden;
}

.video-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>