<template>
  <div class="absolute inset-0 z-20 w-full h-full pointer-events-none">
    <div
      v-show="isReady"
      ref="maskWrapper"
      class="absolute inset-0 w-full h-full"
    >
      <svg
        class="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="`0 0 ${viewportWidth} ${viewportHeight}`"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id="logo-mask">
            <rect :width="viewportWidth" :height="viewportHeight" fill="white" />
            <path
              :transform="`translate(${cx}, ${cy + translateY}) scale(${scale}) translate(${-originalWidth / 2}, ${-originalHeight / 2})`"
              :d="logoPath"
              fill="black"
              :fill-opacity="maskOpacity"
            />
          </mask>
        </defs>
        <rect
          :width="viewportWidth"
          :height="viewportHeight"
          fill="#ffc200"
          mask="url(#logo-mask)"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, inject } from 'vue'

const originalWidth = 360
const originalHeight = 116
const logoPath = `M48.64 57.792h-6.144c-3.456 4.48-6.4 9.6-8.832 15.36-2.432 5.76-3.584 10.112-3.584 13.056 0 2.688 1.024 4.096 3.2 4.096 1.408 0 2.944-1.408 2.944-3.968 0-1.408-1.152-3.328-2.688-3.328-.384 0-.768 0-.896.128 0-2.176 1.92-7.296 5.12-12.672 3.072-5.376 9.344-9.856 16.128-9.856 7.296 0 13.696 5.76 13.696 14.464 0 6.016-1.92 12.288-5.76 18.56-3.84 6.272-8.96 11.52-15.488 15.744-6.528 4.224-13.056 6.272-19.84 6.272-15.488 0-23.168-9.344-23.168-28.16 0-10.752 4.864-24.96 13.568-37.632-4.992-2.688-9.088-6.528-12.032-11.52-2.944-4.864-4.48-9.6-4.48-14.08 0-6.272 2.176-11.776 6.528-16.768C11.264 2.496 17.024.064 24.192.064c10.752 0 18.688 7.04 18.688 16.256 0 7.552-4.992 12.288-11.264 12.288-1.152 0-1.92-.128-2.432-.256 1.536-.768 2.304-2.048 2.304-3.712 0-1.664-1.408-2.944-3.072-2.944-2.432 0-3.968 2.432-3.968 4.992 0 3.072 2.048 6.912 6.016 9.344l.384-.384c13.184-13.056 25.6-19.584 37.12-19.584 5.248 0 9.728 1.28 13.696 3.84 3.968 2.56 5.888 6.144 5.888 10.752 0 5.12-2.048 9.856-6.144 14.08-4.224 4.224-9.216 7.552-15.104 9.728s-11.776 3.328-17.664 3.328ZM66.304 28.48c-3.328 0-7.552 3.2-12.8 9.728 2.56-.128 5.504-1.28 8.832-3.456 3.2-2.176 4.864-3.712 4.992-4.864 0-.896-.384-1.408-1.024-1.408ZM93.68 72l-11.264 31.616H60.4l29.056-80.768h21.376l-9.6 25.856c-3.2 4.608-6.144 9.984-8.576 16h1.28c5.76-12.8 12.288-19.2 19.584-19.2 4.864 0 7.68 2.304 8.576 6.784.896 4.608.128 9.6-2.176 15.104l-5.376 14.848c-.64 1.536-.512 2.304.256 2.304.384 0 1.792-2.56 4.096-7.552l.896 1.536c-.256.896-.896 2.688-2.048 5.248-2.176 5.632-3.84 8.96-7.04 13.696-3.2 4.736-7.552 7.296-12.288 7.296-10.112 0-10.752-11.264-6.528-22.144l5.504-14.592c.64-1.536.512-2.304-.128-2.304S95.472 67.776 93.68 72Zm36.203-24.832h22.016L139.227 82.24c-.384 1.536-.384 2.304.256 2.304s1.92-2.56 4.096-7.552l.896 1.536c-.384 1.536-1.024 3.328-1.92 5.248-2.432 5.76-3.712 8.704-7.04 13.568-3.328 4.864-7.552 7.424-12.288 7.424-4.352 0-7.04-2.176-8.192-6.656-1.024-4.48-.256-9.856 2.176-16.384l12.672-34.56Zm5.248-17.024c.896-3.84 2.816-7.168 5.888-9.984 3.072-2.688 6.272-4.096 9.6-4.096 6.656 0 10.496 6.272 8.576 14.08-.896 3.84-2.816 7.168-5.888 9.856-3.072 2.688-6.272 4.096-9.472 4.096-6.784 0-10.624-6.272-8.704-13.952Zm29.361 49.152-8.576 24.32H133.9l29.056-80.768h21.376l-9.6 25.856c-3.2 4.608-6.144 9.984-8.576 16h1.28c4.736-10.88 10.88-19.2 20.224-19.2 6.144 0 9.088 4.352 9.088 10.112 0 4.48-1.28 8.576-3.84 12.416-2.56 3.968-5.376 6.4-8.576 7.424.384 5.248 1.28 7.936 2.688 7.936 1.664 0 3.456-2.176 5.376-6.4l.896 1.536c-.256.896-.896 2.688-2.048 5.248-2.176 5.632-3.84 8.96-7.04 13.696-3.2 4.736-7.552 7.296-12.288 7.296-10.112 0-10.752-11.264-6.528-22.144l1.152-2.944-2.048-.384Zm6.656-14.336c-.64.128-1.92 2.304-3.84 6.528l-.512 1.536c1.408.384 2.56-.512 3.712-2.688 1.152-2.176 1.664-3.584 1.664-4.352 0-.64-.384-1.152-1.024-1.024Zm32.235-17.792h22.016L212.727 82.24c-.384 1.536-.384 2.304.256 2.304s1.92-2.56 4.096-7.552l.896 1.536c-.384 1.536-1.024 3.328-1.92 5.248-2.432 5.76-3.712 8.704-7.04 13.568-3.328 4.864-7.552 7.424-12.288 7.424-4.352 0-7.04-2.176-8.192-6.656-1.024-4.48-.256-9.856 2.176-16.384l12.672-34.56Zm5.248-17.024c.896-3.84 2.816-7.168 5.888-9.984 3.072-2.688 6.272-4.096 9.6-4.096 6.656 0 10.496 6.272 8.576 14.08-.896 3.84-2.816 7.168-5.888 9.856-3.072 2.688-6.272 4.096-9.472 4.096-6.784 0-10.624-6.272-8.704-13.952Zm31.153 43.904-10.496 29.568H207.4l20.224-56.448h18.048l-7.168 17.536h1.536c2.432-6.016 4.48-11.008 9.216-19.328 2.304-4.096 4.608-7.68 7.04-10.752 4.736-6.016 11.776-11.008 18.048-11.008 6.528 0 11.264 4.096 11.264 10.752 0 5.248-2.944 9.728-8.704 11.392-.384-1.92-1.92-2.944-4.864-2.944-7.808 0-15.872 5.376-21.376 13.056-5.632 7.68-8.448 12.672-10.88 18.176Zm32.055-12.928c2.176-5.888.896-5.888-2.048 0-1.536 2.944-2.816 6.016-3.968 8.96-1.152 2.944-1.536 4.48-1.152 4.48.64 0 1.664-1.536 3.2-4.48 1.536-2.944 2.816-6.016 3.968-8.96Zm-6.144 23.552c-2.432 0-3.712-1.152-3.84-3.456-1.024 3.456.896 5.12 3.968 5.12s6.272-1.408 9.472-4.096c3.2-2.688 5.632-5.632 7.168-8.832l.64 1.408c-2.944 8.704-7.04 15.872-12.288 21.504-5.248 5.632-11.136 8.448-17.408 8.448-8.832 0-14.208-6.4-14.208-15.744 0-7.808 3.712-18.56 9.344-27.52s14.592-15.872 23.424-15.872c8.192 0 12.928 5.632 12.928 13.184 0 5.248-2.048 10.752-6.144 16.768s-8.448 9.088-13.056 9.088Zm45.894-23.552c2.176-5.888.896-5.888-2.048 0-1.536 2.944-2.816 6.016-3.968 8.96-1.152 2.944-1.536 4.48-1.152 4.48.64 0 1.664-1.536 3.2-4.48 1.536-2.944 2.816-6.016 3.968-8.96Zm-6.144 23.552c-2.432 0-3.712-1.152-3.84-3.456-1.024 3.456.896 5.12 3.968 5.12s6.272-1.408 9.472-4.096c3.2-2.688 5.632-5.632 7.168-8.832l.64 1.408c-2.944 8.704-7.04 15.872-12.288 21.504-5.248 5.632-11.136 8.448-17.408 8.448-8.832 0-14.208-6.4-14.208-15.744 0-7.808 3.712-18.56 9.344-27.52s14.592-15.872 23.424-15.872c8.192 0 12.928 5.632 12.928 13.184 0 5.248-2.048 10.752-6.144 16.768s-8.448 9.088-13.056 9.088Zm23.622-30.336h-3.456l2.56-7.168h3.456l5.888-16.384h22.016l-5.888 16.384h4.992l-2.432 7.168h-5.12l-9.856 27.904c-.512 1.536-.384 2.304.256 2.304s1.152-1.152 2.688-4.352c.64-1.536 1.152-2.56 1.408-3.2l.896 1.536c-.128.256-.64 1.664-1.664 4.096-1.024 2.56-1.664 4.224-2.048 5.12-.64 1.536-3.84 8.064-5.248 9.728-2.816 3.456-7.296 7.936-12.288 7.296-9.984-.256-9.344-14.592-4.992-25.728l8.832-24.704Z`

const viewportWidth = ref(1920)
const viewportHeight = ref(1080)
const cx = ref(960)
const cy = ref(540)
const scale = ref(1)
const translateY = ref(0)
const maskOpacity = ref(0)
const isReady = ref(false)
const animationCompleted = ref(false)

const isVideoSection = inject('isVideoSection', ref(false))

let animationFrame
let finalScale = 1
let finalTranslateY = null

const animateFadeIn = () => {
  let start = null
  const duration = 2000
  const step = (timestamp) => {
    if (!start) start = timestamp
    const progress = Math.min((timestamp - start) / duration, 1)
    maskOpacity.value = progress
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const animateLogoUp = (startScale) => {
  const startY = 0
  const duration = 1800
  const startTime = performance.now()

  const animate = (time) => {
    const elapsed = time - startTime
    const t = Math.min(elapsed / duration, 1)
    const easeInOut = t < 0.5
      ? 16 * t * t * t * t * t
      : 1 - Math.pow(-2 * t + 2, 5) / 2

    translateY.value = startY + (finalTranslateY - startY) * easeInOut
    scale.value = startScale + (finalScale - startScale) * easeInOut

    if (t < 1) {
      animationFrame = requestAnimationFrame(animate)
    } else {
      animationCompleted.value = true
      window.hasAlreadySeenIntro = true
    }
  }

  animationFrame = requestAnimationFrame(animate)
}

const updateSize = () => {
  if (typeof window === 'undefined') return

  viewportWidth.value = window.innerWidth
  viewportHeight.value = window.innerHeight 
  cx.value = viewportWidth.value / 2
  cy.value = viewportHeight.value / 2

  const isMobile = viewportWidth.value <= 850
  
  // --- PRECISION CONTROLS ---
  // Adjust these specific numbers to nudge the logo for the perfect match
  const desktopWidth = 150  // Final width in pixels on desktop
  const desktopTop   = 19   // Final distance from top edge in pixels on desktop
  
  const mobileWidth  = 100  // Final width in pixels on mobile
  const mobileTop    = 11   // Final distance from top edge in pixels on mobile
  // ---------------------------

  // 1. Calculate Scale based on chosen width
  const targetWidth = isMobile ? mobileWidth : desktopWidth
  finalScale = targetWidth / originalWidth

  // 2. Calculate Position based on chosen top offset
  const targetTop = isMobile ? mobileTop : desktopTop
  const scaledHeight = originalHeight * finalScale
  
  // Math: Move from center to top edge, then push down by targetTop and half the logo height
  finalTranslateY = -(viewportHeight.value / 2 - (targetTop + (scaledHeight / 2)))

  if (!animationCompleted.value) {
    const scaleW = viewportWidth.value / originalWidth
    const scaleH = viewportHeight.value / originalHeight
    // Initial intro size
    scale.value = Math.min(scaleW, scaleH) * 0.95
    translateY.value = 0
  } else {
    // Lock into final landing position
    scale.value = finalScale
    translateY.value = finalTranslateY
  }
}

onMounted(async () => {
  if (window.hasAlreadySeenIntro) {
    isReady.value = false
    return
  }

  updateSize()
  await nextTick()
  isReady.value = true

  const scaleW = viewportWidth.value / originalWidth
  const scaleH = viewportHeight.value / originalHeight
  const initialScale = Math.min(scaleW, scaleH) * 0.95

  scale.value = initialScale
  translateY.value = 0

  animateFadeIn()
  setTimeout(() => animateLogoUp(initialScale), 4000)

  window.addEventListener('resize', updateSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSize)
  cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
/* Positioning is managed via JS calculation for pixel-perfection */
</style>
