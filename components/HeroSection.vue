<template>
  <section 
    class="section hero-section bg-[#ffc200] relative" 
    aria-labelledby="hero-title"
  >
    <SloganText class="z-50" id="hero-title" />
    
    <LogoMask class="z-30" />

    <div class="absolute inset-0 z-10 pointer-events-none">
      <HeroVideo />
    </div>

    <div
      class="absolute inset-0 z-20 pointer-events-none overlay"
      :class="{ 'no-transition': instantYellow }"
      :style="{ backgroundColor: overlayColor, opacity: blackOverlayOpacity }"
      aria-hidden="true"
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
  if (window.hasAlreadySeenIntro) {
    instantYellow.value = true
    blackOverlayOpacity.value = 1
    overlayColor.value = '#ffc200'
  } else {
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
/* Scoped styles remain unchanged */
.section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  width: 100vw;
  height: 100vh;
  position: relative;
  will-change: transform;
}

.overlay {
  transition: opacity 1.8s ease-in-out, background-color 1.8s ease-in-out; 
}

.overlay.no-transition {
  transition: none !important;
}
</style>