<template>
  <div class="viewport">
    <div ref="container" class="container">
      <!-- Hero Block (без заголовка и caption) -->
      <HeroSection class="panel" />

      <!-- Video Blocks с заголовками и caption -->
      <div
        v-for="(videoId, index) in videoIds"
        :key="videoId"
        class="panel"
        :ref="el => sectionRefs[index] = el"
      >
        <component :is="videoSections[index]" :video-id="videoId" />

        <!-- Верхний заголовок -->
        <div class="section-title-mask">
          <span class="section-title-text" :ref="el => titleRefs[index] = el">
            {{ titles[index + 1] }}
          </span>
        </div>

        <!-- Нижний caption -->
        <div class="section-caption-mask">
          <span
            class="section-caption-text"
            v-html="captions[index]"
            :ref="el => captionRefs[index] = el"
          />
        </div>
      </div>
    </div>

    <!-- Зафиксированный логотип -->
    <svg
  v-if="logoVisible"
  class="fixed left-1/2 z-[9000] -translate-x-1/2"
  xmlns="http://www.w3.org/2000/svg"
  :width="logoSize"
  :height="logoHeight"
  viewBox="0 0 360 116"
  style="top: var(--logo-top);"
  :style="{ color: isVideoSection ? '#ffc200' : 'black' }"
  fill="currentColor"
>
  <path :d="logoPath" />
</svg>

    <!-- Меню -->
    <MenuOverlay class="fixed top-0 left-0 right-0 z-[10000]" :current-index="currentIndex" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import gsap from 'gsap'
let Observer
if (typeof window !== 'undefined') {
  Observer = (await import('gsap/Observer')).default
  gsap.registerPlugin(Observer)
}

import HeroSection from '@/components/HeroSection.vue'
import VideoSection1 from '@/components/VideoSection1.vue'
import VideoSection2 from '@/components/VideoSection2.vue'
import VideoSection3 from '@/components/VideoSection3.vue'
import VideoSection4 from '@/components/VideoSection4.vue'
import VideoSection5 from '@/components/VideoSection5.vue'
import MenuOverlay from '@/components/MenuOverlay.vue'

const container = ref(null)
const currentIndex = ref(0)
const total = 6
let animating = false
let observer = null

const videoSections = [VideoSection1, VideoSection2, VideoSection3, VideoSection4, VideoSection5]
const videoIds = [
  '982811608',
  '751373764',
  '1070485926',
  '711747850',
  '834459439'
]
const titles = ['', 'SUBMERGED', 'JORDAN', 'PHANTOM', 'HEAT SIGNAL', 'AFTERGLOW']
const captions = [
  'Othership<br>by Gene Perez',
  'Aziz<br>by Gene Perez',
  'Trailer<br>by Gene Perez',
  'Heat rising from every corner,\ndriven by breathless motion.',
  'Stillness glowing in the aftermath,\na moment caught in time.'
]

const sectionRefs = Array(5).fill(null)
const titleRefs = Array(5).fill(null)
const captionRefs = Array(5).fill(null)
let lastIndex = 0

function animateTitle(index) {
  const title = titleRefs[index - 1]
  if (!title) return
  const direction = index > lastIndex ? 1 : -1

 gsap.fromTo(title,
  { y: direction === 1 ? '100%' : '-100%', opacity: 0 },
  { y: '0%', opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
)
}

function animateCaption(index) {
  const caption = captionRefs[index - 1]
  if (!caption) return
  const direction = index > lastIndex ? 1 : -1

  gsap.fromTo(caption,
  { y: direction === 1 ? '100%' : '-100%', opacity: 0 },
  { y: '0%', opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.6 }
)

  lastIndex = index
}

const goTo = async (index) => {
  if (index < 0 || index >= total || animating) return
  animating = true

  const panels = container.value.children
  const currentPanel = panels[currentIndex.value]
  const nextPanel = panels[index]

  const isNextHero = index === 0
  const isCurrentHero = currentIndex.value === 0

  if (!isNextHero) {
    gsap.set(nextPanel, { scale: 0.7 })
    animateTitle(index)
    animateCaption(index)
  }

  currentIndex.value = index

  const tl = gsap.timeline({
    onComplete: async () => {
      animating = false
      await nextTick()
    }
  })

  if (!isCurrentHero) {
    tl.to(currentPanel, {
      scale: 0.5,
      duration: 0.9,
      ease: 'power2.inOut'
    })
  }

  tl.to(container.value, {
    y: -index * window.innerHeight,
    duration: 0.9,
    ease: 'power4.inOut'
  }, '<')

  if (!isNextHero) {
    tl.to(nextPanel, {
      scale: 1,
      duration: 1.5,
      ease: 'power3.inOut'
    }, '<')
  }
}

// ==== ЛОГОТИП ==== //
const logoVisible = ref(false)
const isVideoSection = computed(() => currentIndex.value > 0)
const logoPath = `M48.64 57.792h-6.144c-3.456 4.48-6.4 9.6-8.832 15.36-2.432 5.76-3.584 10.112-3.584 13.056 0 2.688 1.024 4.096 3.2 4.096 1.408 0 2.944-1.408 2.944-3.968 0-1.408-1.152-3.328-2.688-3.328-.384 0-.768 0-.896.128 0-2.176 1.92-7.296 5.12-12.672 3.072-5.376 9.344-9.856 16.128-9.856 7.296 0 13.696 5.76 13.696 14.464 0 6.016-1.92 12.288-5.76 18.56-3.84 6.272-8.96 11.52-15.488 15.744-6.528 4.224-13.056 6.272-19.84 6.272-15.488 0-23.168-9.344-23.168-28.16 0-10.752 4.864-24.96 13.568-37.632-4.992-2.688-9.088-6.528-12.032-11.52-2.944-4.864-4.48-9.6-4.48-14.08 0-6.272 2.176-11.776 6.528-16.768C11.264 2.496 17.024.064 24.192.064c10.752 0 18.688 7.04 18.688 16.256 0 7.552-4.992 12.288-11.264 12.288-1.152 0-1.92-.128-2.432-.256 1.536-.768 2.304-2.048 2.304-3.712 0-1.664-1.408-2.944-3.072-2.944-2.432 0-3.968 2.432-3.968 4.992 0 3.072 2.048 6.912 6.016 9.344l.384-.384c13.184-13.056 25.6-19.584 37.12-19.584 5.248 0 9.728 1.28 13.696 3.84 3.968 2.56 5.888 6.144 5.888 10.752 0 5.12-2.048 9.856-6.144 14.08-4.224 4.224-9.216 7.552-15.104 9.728s-11.776 3.328-17.664 3.328ZM66.304 28.48c-3.328 0-7.552 3.2-12.8 9.728 2.56-.128 5.504-1.28 8.832-3.456 3.2-2.176 4.864-3.712 4.992-4.864 0-.896-.384-1.408-1.024-1.408ZM93.68 72l-11.264 31.616H60.4l29.056-80.768h21.376l-9.6 25.856c-3.2 4.608-6.144 9.984-8.576 16h1.28c5.76-12.8 12.288-19.2 19.584-19.2 4.864 0 7.68 2.304 8.576 6.784.896 4.608.128 9.6-2.176 15.104l-5.376 14.848c-.64 1.536-.512 2.304.256 2.304.384 0 1.792-2.56 4.096-7.552l.896 1.536c-.256.896-.896 2.688-2.048 5.248-2.176 5.632-3.84 8.96-7.04 13.696-3.2 4.736-7.552 7.296-12.288 7.296-10.112 0-10.752-11.264-6.528-22.144l5.504-14.592c.64-1.536.512-2.304-.128-2.304S95.472 67.776 93.68 72Zm36.203-24.832h22.016L139.227 82.24c-.384 1.536-.384 2.304.256 2.304s1.92-2.56 4.096-7.552l.896 1.536c-.384 1.536-1.024 3.328-1.92 5.248-2.432 5.76-3.712 8.704-7.04 13.568-3.328 4.864-7.552 7.424-12.288 7.424-4.352 0-7.04-2.176-8.192-6.656-1.024-4.48-.256-9.856 2.176-16.384l12.672-34.56Zm5.248-17.024c.896-3.84 2.816-7.168 5.888-9.984 3.072-2.688 6.272-4.096 9.6-4.096 6.656 0 10.496 6.272 8.576 14.08-.896 3.84-2.816 7.168-5.888 9.856-3.072 2.688-6.272 4.096-9.472 4.096-6.784 0-10.624-6.272-8.704-13.952Zm29.361 49.152-8.576 24.32H133.9l29.056-80.768h21.376l-9.6 25.856c-3.2 4.608-6.144 9.984-8.576 16h1.28c4.736-10.88 10.88-19.2 20.224-19.2 6.144 0 9.088 4.352 9.088 10.112 0 4.48-1.28 8.576-3.84 12.416-2.56 3.968-5.376 6.4-8.576 7.424.384 5.248 1.28 7.936 2.688 7.936 1.664 0 3.456-2.176 5.376-6.4l.896 1.536c-.256.896-.896 2.688-2.048 5.248-2.176 5.632-3.84 8.96-7.04 13.696-3.2 4.736-7.552 7.296-12.288 7.296-10.112 0-10.752-11.264-6.528-22.144l1.152-2.944-2.048-.384Zm6.656-14.336c-.64.128-1.92 2.304-3.84 6.528l-.512 1.536c1.408.384 2.56-.512 3.712-2.688 1.152-2.176 1.664-3.584 1.664-4.352 0-.64-.384-1.152-1.024-1.024Zm32.235-17.792h22.016L212.727 82.24c-.384 1.536-.384 2.304.256 2.304s1.92-2.56 4.096-7.552l.896 1.536c-.384 1.536-1.024 3.328-1.92 5.248-2.432 5.76-3.712 8.704-7.04 13.568-3.328 4.864-7.552 7.424-12.288 7.424-4.352 0-7.04-2.176-8.192-6.656-1.024-4.48-.256-9.856 2.176-16.384l12.672-34.56Zm5.248-17.024c.896-3.84 2.816-7.168 5.888-9.984 3.072-2.688 6.272-4.096 9.6-4.096 6.656 0 10.496 6.272 8.576 14.08-.896 3.84-2.816 7.168-5.888 9.856-3.072 2.688-6.272 4.096-9.472 4.096-6.784 0-10.624-6.272-8.704-13.952Zm31.153 43.904-10.496 29.568H207.4l20.224-56.448h18.048l-7.168 17.536h1.536c2.432-6.016 4.48-11.008 9.216-19.328 2.304-4.096 4.608-7.68 7.04-10.752 4.736-6.016 11.776-11.008 18.048-11.008 6.528 0 11.264 4.096 11.264 10.752 0 5.248-2.944 9.728-8.704 11.392-.384-1.92-1.92-2.944-4.864-2.944-7.808 0-15.872 5.376-21.376 13.056-5.632 7.68-8.448 12.672-10.88 18.176Zm32.055-12.928c2.176-5.888.896-5.888-2.048 0-1.536 2.944-2.816 6.016-3.968 8.96-1.152 2.944-1.536 4.48-1.152 4.48.64 0 1.664-1.536 3.2-4.48 1.536-2.944 2.816-6.016 3.968-8.96Zm-6.144 23.552c-2.432 0-3.712-1.152-3.84-3.456-1.024 3.456.896 5.12 3.968 5.12s6.272-1.408 9.472-4.096c3.2-2.688 5.632-5.632 7.168-8.832l.64 1.408c-2.944 8.704-7.04 15.872-12.288 21.504-5.248 5.632-11.136 8.448-17.408 8.448-8.832 0-14.208-6.4-14.208-15.744 0-7.808 3.712-18.56 9.344-27.52s14.592-15.872 23.424-15.872c8.192 0 12.928 5.632 12.928 13.184 0 5.248-2.048 10.752-6.144 16.768s-8.448 9.088-13.056 9.088Zm45.894-23.552c2.176-5.888.896-5.888-2.048 0-1.536 2.944-2.816 6.016-3.968 8.96-1.152 2.944-1.536 4.48-1.152 4.48.64 0 1.664-1.536 3.2-4.48 1.536-2.944 2.816-6.016 3.968-8.96Zm-6.144 23.552c-2.432 0-3.712-1.152-3.84-3.456-1.024 3.456.896 5.12 3.968 5.12s6.272-1.408 9.472-4.096c3.2-2.688 5.632-5.632 7.168-8.832l.64 1.408c-2.944 8.704-7.04 15.872-12.288 21.504-5.248 5.632-11.136 8.448-17.408 8.448-8.832 0-14.208-6.4-14.208-15.744 0-7.808 3.712-18.56 9.344-27.52s14.592-15.872 23.424-15.872c8.192 0 12.928 5.632 12.928 13.184 0 5.248-2.048 10.752-6.144 16.768s-8.448 9.088-13.056 9.088Zm23.622-30.336h-3.456l2.56-7.168h3.456l5.888-16.384h22.016l-5.888 16.384h4.992l-2.432 7.168h-5.12l-9.856 27.904c-.512 1.536-.384 2.304.256 2.304s1.152-1.152 2.688-4.352c.64-1.536 1.152-2.56 1.408-3.2l.896 1.536c-.128.256-.64 1.664-1.664 4.096-1.024 2.56-1.664 4.224-2.048 5.12-.64 1.536-3.84 8.064-5.248 9.728-2.816 3.456-7.296 7.936-12.288 7.296-9.984-.256-9.344-14.592-4.992-25.728l8.832-24.704Z`
const logoSize = ref('162px')
const logoHeight = ref('52px')

const updateLogoSize = () => {
  if (typeof window === 'undefined') return
  const vw = window.innerWidth

  if (vw <= 850) {
    // ЛОГО
    logoSize.value = '100px'
    logoHeight.value = '32px'
    document.documentElement.style.setProperty('--logo-top', '14px')

    // ТЕКСТЫ
    document.documentElement.style.setProperty('--section-title-size', '14vw')
    document.documentElement.style.setProperty('--section-caption-size', '4.2vw')
  } else {
    // ЛОГО
    logoSize.value = '170px'
    logoHeight.value = '52px'
    document.documentElement.style.setProperty('--logo-top', '14px')

    // ТЕКСТЫ
    document.documentElement.style.setProperty('--section-title-size', '10vw')
    document.documentElement.style.setProperty('--section-caption-size', '1.9vw')
  }
}

onMounted(() => {
  if (typeof window === 'undefined') return

  updateLogoSize()
  gsap.set(container.value, { y: 0 })

  observer = Observer.create({
    type: 'wheel,touch',
    preventDefault: true,
    onDown: () => goTo(currentIndex.value + 1),
    onUp: () => goTo(currentIndex.value - 1),
    tolerance: 25,
    allowClicks: true
  })

  setTimeout(() => {
    logoVisible.value = true
  }, 6000)

  window.addEventListener('resize', updateLogoSize)
})

onBeforeUnmount(() => {
  if (observer) observer.kill()
  window.removeEventListener('resize', updateLogoSize)
})
</script>

<style scoped>
.viewport {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.container {
  position: relative;
  width: 100vw;
  height: 600vh;
}
.panel {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  transform-origin: center center;
  overflow: hidden;
}
.panel:nth-child(1) { top: 0vh; }
.panel:nth-child(2) { top: 100vh; }
.panel:nth-child(3) { top: 200vh; }
.panel:nth-child(4) { top: 300vh; }
.panel:nth-child(5) { top: 400vh; }
.panel:nth-child(6) { top: 500vh; }
.section-title-mask {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  height: 10rem;
  pointer-events: none;
  z-index: 10;
  width: 100vw;
  text-align: center;
}
.section-title-text {
  font-size: var(--section-title-size);
  font-family: 'Druk Text Cyr Heavy', sans-serif;
  font-weight: 500;
  letter-spacing: -0.06em;
  text-transform: uppercase;
  line-height: 1.1;
  color: #ffc200;
  transform: translateY(100%);
  opacity: 0;
  white-space: nowrap;
}

.section-caption-mask {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  height: 5rem;
  pointer-events: none;
  z-index: 10;
  width: 100vw;
  text-align: center;
}
.section-caption-text {
  font-size: var(--section-caption-size);
  font-family: 'EB Garamond', serif;
  font-weight: 400;
  letter-spacing: normal;
  text-transform: none;
  line-height: 1.3;
  color: #ffc200;
  transform: translateY(100%);
  opacity: 0;
  white-space: normal;
  max-width: 90vw;
  text-align: center;
}
.text-#ffc200 {
  color: #ffc200;
}
svg {
  transition: color 0.6s ease-in-out;
}

.fixed.top-0.left-0.right-0 {
  transition: color 0.6s ease-in-out;
}
</style>