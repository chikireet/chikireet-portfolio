<template>
  <section class="section hero-section bg-[#ffc200] relative">
    <SloganText class="z-50" />
    <LogoMask class="z-30" />

    <div class="absolute inset-0 z-10 pointer-events-none">
      <HeroVideo />
    </div>

    <div
      class="absolute inset-0 z-20 pointer-events-none overlay"
      :class="{ 'no-transition': instantYellow }"
      :style="{ backgroundColor: overlayColor, opacity: blackOverlayOpacity }"
    ></div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LogoMask from '@/components/LogoMask.vue'
import HeroVideo from '@/components/HeroVideo.vue'
import SloganText from '@/components/SloganText.vue'

const blackOverlayOpacity = ref(0)
const overlayColor = ref('black')
const instantYellow = ref(false)

onMounted(() => {
  // Check if this session has already triggered the intro
  if (window.hasAlreadySeenIntro) {
    instantYellow.value = true
    blackOverlayOpacity.value = 1
    overlayColor.value = '#ffc200'
  } else {
    // First visit: play the sequence with transitions
    setTimeout(() => {
      blackOverlayOpacity.value = 1
    }, 4000)

    setTimeout(() => {
      overlayColor.value = '#ffc200'
    }, 6000)
  }
})
</script>

<style scoped>
.section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  width: 100vw;
  height: 100vh;
  position: relative;
  will-change: transform;
}

.overlay {
  /* Default transition for the first load */
  transition: opacity 1.8s ease-in-out, background-color 1.8s ease-in-out; 
}

/* Removes transition for internal navigation to prevent the "flicker" */
.overlay.no-transition {
  transition: none !important;
}
</style>