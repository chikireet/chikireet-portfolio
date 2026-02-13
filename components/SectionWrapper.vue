<template>
  <div
    class="section-wrapper"
    :style="{ transform: scaleStyle }"
    ref="sectionRef"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const scaleStyle = ref('scale(1)')

onMounted(() => {
  if (!sectionRef.value) return

  const el = sectionRef.value

  ScrollTrigger.create({
    trigger: el,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => {
      gsap.fromTo(el, { scale: 0.92 }, { scale: 1, duration: 0.4, ease: 'power2.out' })
    },
    onLeaveBack: () => {
      gsap.fromTo(el, { scale: 0.92 }, { scale: 1, duration: 0.4, ease: 'power2.out' })
    }
  })

  ScrollTrigger.create({
    trigger: el,
    start: 'top top',
    end: 'bottom top',
    onLeave: () => {
      gsap.to(el, { scale: 0.92, duration: 0.3, ease: 'power2.in' })
    },
    onEnterBack: () => {
      gsap.to(el, { scale: 0.92, duration: 0.3, ease: 'power2.in' })
    }
  })
})
</script>

<style scoped>
.section-wrapper {
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  will-change: transform;
  transition: transform 0.3s ease-in-out;
}
</style>