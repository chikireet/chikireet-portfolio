<template>
  <div class="slogan-container">
    <h1 
      id="hero-title"
      :class="['slogan-line', 'left', { animate: visible }]"
    >
      Stories You Feel.
    </h1>
    <div :class="['slogan-line', 'right', { animate: visible }]">That’s What I Do.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(false)

onMounted(() => {
  // If we have seen intro, show slogan much faster
  const delay = window.hasAlreadySeenIntro ? 200 : 4750

  setTimeout(() => {
    visible.value = true
  }, delay)
})
</script>

<style scoped>
.slogan-container {
  position: absolute;
  z-index: 50;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vh;
}
.slogan-line {
  font-family: 'Druk', sans-serif;
  font-size: 18vw;
  line-height: 0.8;
  color: #000;
  text-transform: uppercase;
  white-space: nowrap;
  transform: translateX(0);
  /* Added font-weight to ensure semantic headers maintain visual style */
  font-weight: normal; 
}
.slogan-line.left { transform: translateX(-100vw); }
.slogan-line.right { transform: translateX(100vw); }
.slogan-line.animate.left { animation: slideInLeft 1.8s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
.slogan-line.animate.right { animation: slideInRight 1.8s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
@keyframes slideInLeft { 0% { transform: translateX(-100vw); } 100% { transform: translateX(0); } }
@keyframes slideInRight { 0% { transform: translateX(100vw); } 100% { transform: translateX(0); } }
</style>