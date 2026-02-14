<template>
  <div class="fixed inset-0 bg-black antialiased z-0">
    
    <Transition name="header-fade">
      <SiteHeader 
        v-show="showMenu"
        title="Work" 
        link="/work" 
        :menuIndex="1" 
      />
    </Transition>

    <div 
      ref="scrollArea"
      class="scroll-area h-screen w-full overflow-y-auto overflow-x-hidden relative" 
      @scroll="handleScroll"
    >
      <div class="relative z-10 pt-32 md:pt-48">
        <nav class="pb-12 flex justify-center gap-8 md:gap-12">
          <button @click="activeTab = 'branded'" 
                  :class="['roboto-tabs tracking-wide transition-all cursor-pointer group', activeTab === 'branded' ? 'active-tab' : 'inactive-tab']">
            <span class="btn-text">Directed</span>
          </button>
          <button @click="activeTab = 'photography'" 
                  :class="['roboto-tabs tracking-wide transition-all cursor-pointer group', activeTab === 'photography' ? 'active-tab' : 'inactive-tab']">
            <span class="btn-text">Photography</span>
          </button>
        </nav>

        <main class="pb-20 px-0 md:px-1 relative z-0">
          <div v-if="activeTab === 'branded'" class="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div v-for="(work, index) in videoWorks" 
                 :key="'vid-'+index" 
                 class="work-tile group cursor-pointer opacity-0 transform translate-y-10"
                 @click="openModal(work.vimeoId, work.title, work.client)">
              
              <video 
                class="preview-video"
                autoplay muted loop playsinline disablePictureInPicture
                :aria-label="`${work.title} directed by Toronto filmmaker Gene Perez`"
              >
                <source :src="`/Previews/${work.localPreview}`" type="video/mp4">
              </video>

              <div class="tile-overlay"></div>
              <div class="absolute inset-0 z-10 p-6 md:p-10 flex flex-col items-center transition-opacity duration-500 group-hover:opacity-0 text-[#ffc200]">
                <div class="text-center">
                  <p class="garamond-font text-lg md:text-xl leading-tight italic">{{ work.client }}</p>
                  <p class="garamond-font text-lg md:text-xl leading-tight italic">{{ work.type }}</p>
                </div>
                <div class="mt-auto">
                  <h3 class="druk-title text-4xl md:text-6xl uppercase tracking-tighter text-center leading-[0.85]">{{ work.title }}</h3>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="px-1 md:px-4">
            <div class="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              <div v-for="(photo, index) in photographyWorks" 
                   :key="'photo-'+index" 
                   @click="selectedPhoto = photo"
                   class="relative group cursor-pointer break-inside-avoid photography-item mb-4 opacity-0 transform translate-y-10">
                <div class="relative overflow-hidden shadow-xl">
                  <div class="absolute inset-0 border-0 group-hover:border-[10px] border-[#ffc200] z-20 pointer-events-none transition-all duration-300"></div>
                  <img 
                    :src="photo.url" 
                    :alt="photo.seoAlt"
                    class="w-full h-auto transition-transform duration-700 ease-in-out group-hover:scale-125 block z-10" 
                    loading="lazy"
                  />
                </div>
                <div class="pt-2 pb-4 text-[#ffc200] italic garamond-font text-sm md:text-base">
                  {{ photo.title }}
                </div>
              </div>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </div>

    <VideoModal v-if="isModalOpen" :video-id="activeVideoId" :title="activeTitle" :caption="activeClient" @close="closeModal" />

    <Transition name="modal-zoom">
      <div v-if="selectedPhoto" class="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl px-4" @click="selectedPhoto = null">
        <div class="relative w-fit h-fit max-w-[90vw] max-h-[80vh] flex flex-col items-center" @click.stop>
          <button class="absolute -top-12 -right-2 text-[#ffc200] z-[2100] group/close" @click="selectedPhoto = null">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="4.5">
              <line x1="10" y1="10" x2="30" y2="30" class="origin-center transition-transform duration-500 group-hover/close:rotate-90" />
              <line x1="30" y1="10" x2="10" y2="30" class="origin-center transition-transform duration-500 group-hover/close:rotate-90" />
            </svg>
          </button>
          
          <img :src="selectedPhoto.url" :alt="selectedPhoto.seoAlt" class="max-w-full max-h-[70vh] object-contain shadow-2xl" />
          <div class="pt-6 text-center">
            <p class="garamond-font text-[#ffc200] text-xl md:text-2xl italic tracking-[0.1em]">{{ selectedPhoto.title }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
/**
 * SEO Agency Strategy: Portfolio Authority
 */
useSeoMeta({
  title: 'Directed Work & Photography | Gene Perez Toronto',
  ogTitle: 'Directed Work & Photography | Gene Perez Toronto',
  description: 'View the portfolio of Gene Perez, a Toronto director and photographer. Featuring commercial films for Hyundai, DJI, and Othership alongside creative photography.',
  ogDescription: 'Commercial film and photography portfolio of Gene Perez in Toronto.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
})

useHead({
  title: 'Directed Work & Photography | Gene Perez Toronto',
  meta: [
    { name: 'description', content: 'View the portfolio of Gene Perez, a Toronto director and photographer. Featuring commercial films for Hyundai, DJI, and Othership.' }
  ]
})

import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import VideoModal from '@/components/VideoModal.vue'

gsap.registerPlugin(ScrollTrigger)

const activeTab = ref('branded')
const selectedPhoto = ref(null)
const showMenu = ref(true)
const lastScrollY = ref(0)
const isModalOpen = ref(false)
const activeVideoId = ref('')
const activeTitle = ref('')
const activeClient = ref('')
const scrollArea = ref(null)

watch([isModalOpen, selectedPhoto], ([modal, photo]) => {
  if (typeof document !== 'undefined') {
    if (modal || photo) {
      document.documentElement.classList.add('lock-scroll');
    } else {
      document.documentElement.classList.remove('lock-scroll');
    }
  }
});

const openModal = (id, title, client) => {
  activeVideoId.value = id; activeTitle.value = title; activeClient.value = client; isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  nextTick(() => { activeVideoId.value = ''; activeTitle.value = ''; activeClient.value = ''; });
};

const handleScroll = (e) => {
  if (isModalOpen.value || selectedPhoto.value) return; 
  const currentScrollY = e.target.scrollTop;
  if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    showMenu.value = false;
  } else {
    showMenu.value = true;
  }
  lastScrollY.value = currentScrollY;
}

const initScrollAnimations = (selector) => {
  const items = document.querySelectorAll(selector);
  items.forEach((item) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        scroller: scrollArea.value,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      },
      opacity: 1, y: 0, duration: 1, ease: "power3.out"
    });
  });
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    nextTick(() => { 
      if (scrollArea.value) scrollArea.value.scrollTop = 0; 
      initScrollAnimations('.work-tile'); 
    });
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('lock-scroll');
  }
})

watch(activeTab, (newTab) => {
  nextTick(() => {
    ScrollTrigger.refresh();
    initScrollAnimations(newTab === 'photography' ? '.photography-item' : '.work-tile');
  });
})

const videoWorks = [
  { title: 'FREEZE THE MOMENT', client: 'Othership', type: 'Commercial', vimeoId: '1161375860', localPreview: '/Previews/othership_freeze_the_momen.mp4' },
  { title: 'RNR IS ASLEEP', client: 'ROMES', type: 'Music Video', vimeoId: '1134782625', localPreview: '/Previews/romes_rock_n_roll_is_asleep.mp4' },
  { title: 'JORDAN', client: 'BinBaz', type: 'Travel Video', vimeoId: '1158027631', localPreview: '/Previews/jordan.mp4' },
  { title: 'PHANTOM', client: 'Trailer', type: 'Short Film', vimeoId: '1158824495', localPreview: '/Previews/the_phantom.mp4' },
  { title: 'FEEL IT', client: 'Hyundai', type: 'Commercial', vimeoId: '1134782625', localPreview: '/Previews/hyundai_feel_it.mp4' },
  { title: 'OTHERSHIP', client: 'Chill', type: 'Commercial', vimeoId: '1161375860', localPreview: '/Previews/chill_your_stress_othership.mp4' },
  { title: 'ROSH POSH', client: 'MSLS', type: 'Commercial', vimeoId: '1134782625', localPreview: '/Previews/rosh_posh_msls.mp4' },
  { title: 'SMOOTH X2', client: 'Zhiyun', type: 'Commercial', vimeoId: '1158027631', localPreview: '/Previews/zhiyun_smooth_x2.mp4' },
  { title: 'SAY SOMETHING', client: 'TTC', type: 'Commercial', vimeoId: '1158824495', localPreview: '/Previews/ttc_if_you_see_something_say_something.mp4' }
]

const photographyWorks = [
  { title: 'Midnight Reverie', seoAlt: 'Cinematic portrait in a neon-lit laundry room by Toronto photographer Gene Perez', url: 'photos/1.avif' },
  { title: 'Quantum', seoAlt: 'Night photography of a man in front of a Chinese restaurant in Toronto by Gene Perez', url: 'photos/2.avif' },
  { title: 'Midnight Reverie', seoAlt: 'Atmospheric night portrait with blue and orange lighting in Toronto', url: 'photos/20.avif' },
  { title: "Sorry, I'm Creative", seoAlt: 'Creative low-key portrait with red projector effects by Gene Perez Toronto', url: 'photos/26.avif' },
  { title: 'Quantum Flux', seoAlt: 'Cinematic silhouette of a man looking through a rainy window in Toronto', url: 'photos/24.avif' },
  { title: 'Phone Booth', seoAlt: 'High-angle cinematic shot in a vintage phone booth with orange lighting', url: 'photos/29.avif' },
  { title: 'Midnight Reverie', seoAlt: 'Cinematic photography of a woman reading in a blue-lit laundry facility', url: 'photos/34.avif' },
  { title: 'Phone Booth', seoAlt: 'Cinematic photography of a man using a public phone with neon reflections', url: 'photos/7.avif' },
  { title: 'Quantum', seoAlt: 'Street photography portrait in Toronto’s Chinatown at sunset by Gene Perez', url: 'photos/10.avif' },
  { title: 'Warrior', seoAlt: 'Dramatic high-contrast sports portrait of a Muay Thai fighter by Gene Perez', url: 'photos/5.avif' },
  { title: "Sorry, I'm Creative", seoAlt: 'Cinematic portrait of a musician with a guitar in blue and red lighting', url: 'photos/3.avif' },
  { title: 'Phone Booth', seoAlt: 'Moody cinematic close-up of a man on a vintage phone by Gene Perez', url: 'photos/23.avif' },
  { title: 'Warrior', seoAlt: 'High-fashion cinematic portrait with saturated blue and purple accent lighting', url: 'photos/27.avif' },
  { title: "Sorry, I'm Creative", seoAlt: 'Low-angle creative photography of an electric guitar against a red brick wall', url: 'photos/31.avif' },
  { title: 'Warrior', seoAlt: 'Moody high-contrast sports photography of a boxer in blue and purple tones', url: 'photos/35.avif' },
  { title: 'Phone Booth', seoAlt: 'Close-up creative lighting portrait in a Toronto phone booth by Gene Perez', url: 'photos/8.avif' },
  { title: 'Phone Booth', seoAlt: 'Dramatic high-angle shot in an orange phone booth by Director Gene Perez', url: 'photos/32.avif' },
  { title: 'Quantum', seoAlt: 'High-fashion cinematic portrait of a man in round glasses with red and green lighting', url: 'photos/21.avif' },
  { title: 'Warrior', seoAlt: 'Multiple exposure photography of a Muay Thai kick sequence by Gene Perez', url: 'photos/22.avif' },
  { title: 'Midnight Reverie', seoAlt: 'Cinematic night portrait with blue and orange lighting by Gene Perez', url: 'photos/25.avif' },
  { title: "Sorry, I'm Creative", seoAlt: 'High-concept cinematic portrait of a man with headphones in a red studio', url: 'photos/28.avif' },
  { title: 'Midnight Reverie', seoAlt: 'Atmospheric night portrait with cinematic blue lighting in Toronto', url: 'photos/30.avif' },
  { title: 'Quantum', seoAlt: 'Cinematic night portrait of a man in round glasses with vibrant blue lighting', url: 'photos/33.avif' }
]
</script>

<style scoped>
/* ADDED: Smooth Modal Zoom Transition */
.modal-zoom-enter-active,
.modal-zoom-leave-active {
  transition: opacity 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}

.modal-zoom-enter-active div,
.modal-zoom-leave-active div {
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}

.modal-zoom-enter-from { opacity: 0; }
.modal-zoom-enter-from div { transform: scale(0.9) translateY(20px); }

.modal-zoom-leave-to { opacity: 0; }
.modal-zoom-leave-to div { transform: scale(0.9) translateY(20px); }

:global(html.lock-scroll), 
:global(html.lock-scroll body) {
  overflow: hidden !important;
  height: 100vh !important;
  position: fixed !important;
  width: 100% !important;
}

.btn-text { position: relative; display: inline-block; }
.btn-text::after {
  content: ''; position: absolute; top: 55%; left: 0; width: 100%; height: 1.5px;
  background-color: #ffc200; transform: scaleX(0); transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.group:hover .btn-text::after, .active-tab .btn-text::after { transform: scaleX(1); }

.roboto-tabs { font-family: 'Roboto', sans-serif; font-weight: 500; font-size: 1.15rem; letter-spacing: 0.05em; color: #ffc200; position: relative; }
.active-tab { opacity: 1; }
.inactive-tab { opacity: 0.4; transition: opacity 0.3s ease; }
.inactive-tab:hover { opacity: 1; }

.header-fade-enter-active, .header-fade-leave-active { transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.4s ease; }
.header-fade-enter-from, .header-fade-leave-to { transform: translateY(-100%); opacity: 0; }

.preview-video {
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; 
  pointer-events: none; transform: scale(1.01); transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}
.group:hover .preview-video { transform: scale(1.2); }

.scroll-area {
  height: 100vh; 
  width: 100%; 
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch; 
  position: relative; 
  z-index: 10;
}

:global(html), :global(body) { background-color: black !important; margin: 0; padding: 0; overflow: auto; height: 100% !important; }

.druk-title { font-family: 'Druk Text Cyr Heavy', sans-serif; }
.garamond-font { font-family: 'EB Garamond', serif; }

.work-tile { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: #18181b; }
.tile-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.7) 100%);
  z-index: 5;
}

.scroll-area::-webkit-scrollbar { width: 4px; }
.scroll-area::-webkit-scrollbar-thumb { background: #ffc20033; border-radius: 10px; }
</style>
