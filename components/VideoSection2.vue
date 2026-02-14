<template>
  <section class="video-section section bg-black relative">
    <div class="video-wrapper">
      <div class="overlay"></div>

      <video
        autoplay
        muted
        loop
        playsinline
        class="video-element"
        :aria-label="`${title} - Travel cinematography by Toronto Director Gene Perez`"
      >
        <source src="/previews/jordan.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <h2 class="absolute z-10 bottom-10 left-10 text-white text-3xl font-bold">
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
  /* Ensures the Jordan footage fills the frame perfectly without distortion */
  object-fit: cover;
  z-index: 0;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35); /* уровень затемнения */
  z-index: 1;
  pointer-events: none;
}
</style>