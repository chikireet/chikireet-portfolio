<template>
  <div class="fixed top-0 left-0 z-[9999] px-6 pt-4 pointer-events-none">
    <div class="pointer-events-auto relative z-0">
      <slot name="logo" />
    </div>
  </div>

  <div class="fixed top-0 right-0 z-[10002] px-6 pt-4 pointer-events-none">
    <button
      v-if="showButton"
      @click="toggleMenu"
      :class="[
        'uppercase font-druk-heavy pointer-events-auto',
        'transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90',
        'transition-opacity duration-700 ease-in-out',
        menuOpen || currentIndex > 0 ? 'text-[#ffc200]' : 'text-black',
        'opacity-100' 
      ]"
      :style="{ fontSize: 'var(--menu-font-size)' }"
    >
      {{ menuOpen ? 'Close' : 'Menu' }}
    </button>
  </div>

  <transition name="menu-slide">
    <div
      v-if="menuOpen"
      class="fixed inset-0 z-[10000] bg-black 'text-[#ffc200]' flex flex-col justify-center items-center overflow-hidden"
    >
      <ul
        class="uppercase font-druk-heavy leading-[1.1] text-center space-y-6"
        :style="{ fontSize: 'var(--menu-item-size)' }"
      >
        <li v-for="item in menuItems" :key="item.label">
          <NuxtLink
            :to="item.link"
            class="rolling-link"
            @click="toggleMenu"
            @mouseenter="triggerWave(item.label)"
            @mouseleave="reverseWave(item.label)"
            @touchstart="triggerWave(item.label)"
            @touchend="reverseWave(item.label)"
          >
            <span
              v-for="(char, i) in item.label.split('')"
              :key="i"
              class="letter-wrapper"
              :class="{ flipped: flippedLetters[item.label]?.[i] }"
            >
              <span class="letter top">{{ char }}</span>
              <span class="letter bottom">{{ char }}</span>
            </span>
          </NuxtLink>
        </li>
      </ul>

      <div class="mt-12 text-base uppercase font-druk-heavy flex gap-6">
        <a href="https://instagram.com/chikireet" target="_blank" class="hover:underline">Instagram</a>
        <a href="https://vimeo.com/evingeny" target="_blank" class="hover:underline">Vimeo</a>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  currentIndex: {
    type: Number,
    default: 0
  }
})

const menuOpen = ref(false)
// INSTANT LOAD: Set to true immediately
const showButton = ref(true) 
const buttonVisible = ref(true) 
const flippedLetters = ref({})

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const triggerWave = (label) => {
  flippedLetters.value[label] = []
  label.split('').forEach((_, i) => {
    setTimeout(() => {
      flippedLetters.value[label][i] = true
    }, i * 50)
  })
}

const reverseWave = (label) => {
  if (!flippedLetters.value[label]) return
  label.split('').forEach((_, i) => {
    setTimeout(() => {
      flippedLetters.value[label][i] = false
    }, i * 50)
  })
}

onMounted(() => {
  // DELAYS REMOVED for instant appearance
  if (typeof window !== 'undefined') {
    updateMenuFontSize()
    window.addEventListener('resize', updateMenuFontSize)
  }
})

const menuItems = [
  { label: 'Work', link: '/work' },
  { label: 'About', link: '/about' },
  { label: 'Shop', link: '/shop' },
  { label: 'Contact', link: '/contact' }
]

const updateMenuFontSize = () => {
  if (window.innerWidth <= 850) {
    document.documentElement.style.setProperty('--menu-font-size', '20px')
    document.documentElement.style.setProperty('--menu-item-size', '11vw')
  } else {
    document.documentElement.style.setProperty('--menu-font-size', '30px')
    document.documentElement.style.setProperty('--menu-item-size', '5.5vw')
  }
}
</script>

<style scoped>
@import '/fonts/druk.css';

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}
.menu-slide-enter-from,
.menu-slide-leave-to {
  transform: translateY(100%);
}
.menu-slide-enter-to,
.menu-slide-leave-from {
  transform: translateY(0);
}

.rolling-link {
  display: inline-block;
  font-size: inherit;
  line-height: 1em;
  height: 1em;
  overflow: hidden;
  color: #ffc200;
  text-decoration: none;
}

.letter-wrapper {
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.letter {
  display: block;
  transition: transform 0.6s cubic-bezier(0.76, 0, 0.24, 1);
  will-change: transform;
}

.letter.top, .letter.bottom {
  color: #ffc200;
}

.letter.bottom {
  position: absolute;
  top: 100%;
  left: 0;
}

.letter-wrapper.flipped .letter.top {
  transform: translateY(-100%);
}

.letter-wrapper.flipped .letter.bottom {
  transform: translateY(-100%);
}

button {
  transition: opacity 0.8s ease-in-out, color 0.4s ease-in-out, transform 0.3s ease-in-out;
}

ul {
  transition: font-size 0.4s ease-in-out;
}
</style>