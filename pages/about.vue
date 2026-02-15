<template>
  <div class="about-container bg-black antialiased flex flex-col">
    <SiteHeader 
      title="About" 
      link="/about" 
      :menu-index="2" 
      :show="showMenu" 
    />

    <main class="flex flex-col md:flex-row flex-grow min-h-0">
      <section class="w-full md:w-1/2 h-[50vh] md:h-full overflow-hidden">
        <img 
          src="/portrait.avif" 
          alt="Gene Perez - Director and Photographer in Toronto" 
          class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out object-[center_40%] md:object-center"
        />
      </section>

      <section class="w-full md:w-1/2 px-8 md:px-20 pt-16 md:pt-0 pb-12 md:pb-0 flex flex-col justify-center relative z-10 bg-black">
        <header class="mb-6 appear-animate">
          <h1 class="druk-title text-[#ffc200] text-5xl md:text-7xl lg:text-8xl leading-[0.85] uppercase tracking-tighter mb-4">
            Gene Perez
          </h1>
          <h2 class="garamond-font text-[#ffc200] text-lg md:text-xl italic tracking-wide">
            Director & Photographer
          </h2>
        </header>

        <article class="max-w-xl appear-animate delay-200">
          <div class="garamond-font text-[#ffc200] text-base md:text-lg leading-relaxed space-y-6 opacity-90 text-justify">
            <p>
              Gene Perez is a Toronto-based Director and Cinematographer originally from Ukraine. He leads with a "Story-First" philosophy, believing that a compelling narrative must be established before the first frame is captured.
            </p>
            
            <p>
              This focus on intentional lighting and color has led him to helm global campaigns for brands like 
              <strong class="font-bold">Hyundai</strong>, 
              <strong class="font-bold">DJI</strong>, 
              <strong class="font-bold">Zhiyun</strong>, and 
              <strong class="font-bold">Canadian Tire</strong>, 
              as well as immersive commercial spots for 
              <strong class="font-bold">Othership</strong>. 
              Gene’s approach remains consistent across both high-end branded content and music videos: every technical choice must serve the story.
            </p>
          </div>
        </article>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
/**
 * SEO Agency Strategy: Local Authority & SSR Protection
 * Targeted Query: "Director and Photographer in Toronto"
 */
useSeoMeta({
  title: 'About Gene Perez | Director & Photographer Toronto',
  description: 'Gene Perez is a filmmaker originally from Ukraine, now based in Toronto. Specializing in high-end branded content and intentional cinematography.',
  ogTitle: 'About Gene Perez | Director & Photographer in Toronto',
  ogDescription: 'Leading with a Story-First philosophy in Cinematography and Photography.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
})

useHead({
  title: 'About Gene Perez | Director & Photographer Toronto',
  meta: [
    { name: 'description', content: 'Gene Perez is a filmmaker originally from Ukraine, now based in Toronto. Specializing in high-end branded content and intentional cinematography.' }
  ]
})

import { ref, onMounted, onUnmounted } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const showMenu = ref(true)
const lastScrollY = ref(0)

const handleScroll = () => {
  const currentScrollY = window.scrollY
  showMenu.value = !(currentScrollY > lastScrollY.value && currentScrollY > 100)
  lastScrollY.value = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Global Scrollbar Removal to match your other pages */
:global(html::-webkit-scrollbar), 
:global(body::-webkit-scrollbar) {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

:global(html), :global(body) {
  background-color: black !important;
  margin: 0;
  padding: 0;
  height: auto;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

@media (min-width: 768px) {
  :global(html), :global(body) {
    overflow: hidden !important;
    height: 100% !important;
  }
  .about-container {
    height: 100vh !important;
    overflow: hidden !important;
  }
}

@media (max-width: 767px) {
  .about-container {
    height: auto !important;
    overflow-y: auto !important;
  }
}

.druk-title { font-family: 'Druk Text Cyr Heavy', sans-serif; }
.garamond-font { font-family: 'EB Garamond', serif; }

.appear-animate {
  opacity: 0;
  transform: translateY(30px);
  animation: fade-up 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}
.delay-200 { animation-delay: 0.2s; }

@keyframes fade-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

strong {
  font-weight: 700;
  letter-spacing: 0.02em;
}
</style>