<template>
  <div
    class="absolute inset-0 w-screen h-screen overflow-hidden z-10 pointer-events-none"
    :class="logoAnimationDone ? 'bg-[#ffc200]' : 'bg-black'"
  >
    <div class="w-full h-full flex items-center justify-center">
      <div class="w-full h-full max-w-full max-h-full aspect-[16/9]">
        <video
          v-show="videoVisible"
          ref="videoRef"
          autoplay
          muted
          loop
          playsinline
          class="w-full h-full object-contain"
          aria-label="Cinematography showreel by Toronto Director Gene Perez"
        >
          <source src="/your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    <transition name="fade">
      <img
        v-if="showPoster"
        src="/poster.jpg"
        class="absolute inset-0 w-full h-full object-contain z-20 bg-black"
        alt="Behind the scenes of a cinematic film production in Toronto directed by Gene Perez"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'

const showPoster = ref(false)
const videoVisible = ref(false)
const logoAnimationDone = inject('logoAnimationDone', ref(false))

onMounted(() => {
  // Показываем постер через 600 мс (маска уже появилась)
  setTimeout(() => {
    showPoster.value = true
  }, 100)

  // Убираем постер и показываем видео через 1500 мс
  setTimeout(() => {
    showPoster.value = false
    videoVisible.value = true
  }, 300)
})
</script>

<style scoped>
/* Scoped styles remain unchanged */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 1;
}
</style>