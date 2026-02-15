<template>
  <section class="video-section section bg-black relative">
    <div class="video-wrapper">
      <div class="overlay"></div>
      <video autoplay muted loop playsinline class="video-element">
        <source src="/previews/chill_your_stress_othership.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="absolute z-10 bottom-10 left-10 text-white text-3xl font-bold">
      {{ title }}
    </div>
  </section>
</template>

<script setup>
defineProps({
  videoId: { type: String, required: true },
  title: { type: String, default: '' }
})
</script>

<style scoped>
.video-section {
  width: 100vw;
  height: 100dvh !important;
  overflow: hidden;
  position: relative;
  background-color: black;
}
.video-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.video-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1;
  pointer-events: none;
}
</style>
