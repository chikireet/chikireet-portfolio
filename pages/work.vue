<template>
  <div class="bg-black antialiased min-h-screen">
    
    <SiteHeader 
      title="Work" 
      link="/work" 
      :menuIndex="1" 
      :show="showMenu" 
    />

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
              autoplay muted loop playsinline preload="metadata"
              :poster="`/previews/posters/${work.poster}`"
              disablePictureInPicture
            >
              <source :src="`/previews/${work.localPreview}`" type="video/mp4">
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
                 class="photography-item relative group cursor-pointer break-inside-avoid mb-4 opacity-0 transform translate-y-10"
                 @click="selectedPhoto = photo">
              
              <div class="relative overflow-hidden shadow-xl bg-[#0a0a0a] min-h-[300px]">
                <div v-if="!photo.loaded" class="skeleton-loader absolute inset-0 z-30"></div>
                
                <div class="hover-border absolute inset-0 border-0 z-20 pointer-events-none transition-all duration-300"></div>
                
                <img 
                  :src="photo.url" 
                  :loading="index < 6 ? 'eager' : 'lazy'"
                  @load="photo.loaded = true"
                  @error="photo.loaded = true"
                  :class="['w-full h-auto transition-all duration-1000 ease-in-out group-hover:scale-125 block z-10', photo.loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105 blur-sm']" 
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

    <VideoModal v-if="isModalOpen" :video-id="activeVideoId" :title="activeTitle" :caption="activeClient" @close="closeModal" />

    <Transition name="fade">
      <div v-if="selectedPhoto" class="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl px-4" @click="selectedPhoto = null">
        <div class="relative w-fit h-fit max-w-[90vw] max-h-[80vh] flex flex-col items-center" @click.stop>
          <button class="absolute -top-12 -right-2 text-[#ffc200] z-[2100] group/close" @click="selectedPhoto = null">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="4.5">
              <line x1="10" y1="10" x2="30" y2="30" class="origin-center transition-transform duration-500 group-hover/close:rotate-90" />
              <line x1="30" y1="10" x2="10" y2="30" class="origin-center transition-transform duration-500 group-hover/close:rotate-90" />
            </svg>
          </button>
          <img :src="selectedPhoto.url" class="max-w-full max-h-[70vh] object-contain shadow-2xl" />
          <div class="pt-6 text-center">
            <p class="garamond-font text-[#ffc200] text-xl md:text-2xl italic tracking-[0.1em]">{{ selectedPhoto.title }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch, reactive } from 'vue'
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

const handleScroll = () => {
  if (isModalOpen.value || selectedPhoto.value) return
  const currentScrollY = window.scrollY
  showMenu.value = !(currentScrollY > lastScrollY.value && currentScrollY > 100)
  lastScrollY.value = currentScrollY
}

const initScrollAnimations = (selector) => {
  const items = document.querySelectorAll(selector)
  items.forEach((item) => {
    gsap.to(item, {
      scrollTrigger: { trigger: item, start: "top bottom-=50", toggleActions: "play none none none" },
      opacity: 1, y: 0, duration: 1, ease: "power3.out"
    })
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  nextTick(() => { initScrollAnimations('.work-tile') })
})

onUnmounted(() => { window.removeEventListener('scroll', handleScroll) })

const openModal = (id, title, client) => {
  activeVideoId.value = id; activeTitle.value = title; activeClient.value = client; isModalOpen.value = true;
}
const closeModal = () => { isModalOpen.value = false; }

watch(activeTab, (newTab) => {
  nextTick(() => {
    ScrollTrigger.refresh()
    initScrollAnimations(newTab === 'photography' ? '.photography-item' : '.work-tile')
  })
})

const videoWorks = [
  { title: 'FREEZE THE MOMENT', client: 'Othership', type: 'Commercial', vimeoId: '1161375860', localPreview: 'othership_freeze_the_momen.mp4', poster: 'othership_freeze_the_momen.webp' },
  { title: 'RNR IS ASLEEP', client: 'ROMES', type: 'Music Video', vimeoId: '1134782625', localPreview: 'romes_rock_n_roll_is_asleep.mp4', poster: 'romes_rock_n_roll_is_asleep.webp' },
  { title: 'JORDAN', client: 'BinBaz', type: 'Travel Video', vimeoId: '1158027631', localPreview: 'jordan.mp4', poster: 'jordan.webp' },
  { title: 'PHANTOM', client: 'Trailer', type: 'Short Film', vimeoId: '1158824495', localPreview: 'the_phantom.mp4', poster: 'the_phantom.webp' },
  { title: 'FEEL IT', client: 'Hyundai', type: 'Commercial', vimeoId: '1161371386', localPreview: 'hyundai_feel_it.mp4', poster: 'hyundai_feel_it.webp' },
  { title: 'SMOOTH X2', client: 'ZHIYUN', type: 'Commercial', vimeoId: '1161369145', localPreview: 'zhiyun_smooth_x2.mp4', poster: 'zhiyun_smooth_x2.webp' },
  { title: 'TTC', client: 'TTC', type: 'Creative Project', vimeoId: '1158583072', localPreview: 'ttc_if_you_see_something_say_something.mp4', poster: 'ttc_if_you_see_something_say_something.webp' },
  { title: 'MSLS', client: 'Rosh Posh', type: 'Commercial', vimeoId: '1161372925', localPreview: 'rosh_posh_msls.mp4', poster: 'rosh_posh_msls.webp' },
  { title: 'ALTERED STATE', client: 'Othership', type: 'Commercial', vimeoId: '1158028099', localPreview: 'chill_your_stress_othership.mp4', poster: 'chill_your_stress_othership.webp' },
  { title: 'PIECE OF GLASS', client: 'Windshield Experts', type: 'Commercial', vimeoId: '1161373792', localPreview: 'windshield_experts_piece_of_glass.mp4', poster: 'windshield_experts_piece_of_glass.webp' }
]

const photographyWorks = reactive([
  { title: 'Midnight Reverie', url: 'photos/1.webp', loaded: false },
  { title: 'Quantum', url: 'photos/2.webp', loaded: false },
  { title: 'Warrior', url: 'photos/6.webp', loaded: false },
  { title: 'Midnight Reverie', url: 'photos/20.webp', loaded: false },
  { title: 'Sorry, I\'m Creative', url: 'photos/26.webp', loaded: false },
  { title: 'Quantum', url: 'photos/24.webp', loaded: false },
  { title: 'Phone Booth', url: 'photos/29.webp', loaded: false },
  { title: 'Midnight Reverie', url: 'photos/34.webp', loaded: false },
  { title: 'Phone Booth', url: 'photos/7.webp', loaded: false },
  { title: 'Quantum', url: 'photos/10.webp', loaded: false },
  { title: 'Warrior', url: 'photos/5.webp', loaded: false },
  { title: 'Sorry, I\'m Creative', url: 'photos/3.webp', loaded: false },
  { title: 'Phone Booth', url: 'photos/23.webp', loaded: false },
  { title: 'Warrior', url: 'photos/27.webp', loaded: false },
  { title: 'Warrior', url: 'photos/31.webp', loaded: false },
  { title: 'Warrior', url: 'photos/35.webp', loaded: false },
  { title: 'Phone Booth', url: 'photos/8.webp', loaded: false },
  { title: 'Phone Booth', url: 'photos/32.webp', loaded: false },
  { title: 'Quantum', url: 'photos/21.webp', loaded: false },
  { title: 'Warrior', url: 'photos/22.webp', loaded: false },
  { title: 'Midnight Reverie', url: 'photos/25.webp', loaded: false },
  { title: 'Sorry, I\'m Creative', url: 'photos/28.webp', loaded: false },
  { title: 'Midnight Reverie', url: 'photos/30.webp', loaded: false },
  { title: 'Quantum', url: 'photos/33.webp', loaded: false }
])
</script>

<style scoped>
:global(html::-webkit-scrollbar), :global(body::-webkit-scrollbar) { display: none !important; }
:global(html), :global(body) { background-color: black !important; margin: 0; padding: 0; overflow-y: auto !important; overflow-x: hidden !important; scrollbar-width: none !important; }

/* CATEGORY TABS EFFECT RESTORED */
.btn-text { position: relative; display: inline-block; }
.btn-text::after {
  content: ''; position: absolute; top: 55%; left: 0; width: 100%; height: 1.5px;
  background-color: #ffc200; transform: scaleX(0); transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.group:hover .btn-text::after, .active-tab .btn-text::after { transform: scaleX(1); }

.roboto-tabs { font-family: 'Roboto', sans-serif; font-weight: 500; font-size: 1.15rem; letter-spacing: 0.05em; color: #ffc200; }
.active-tab { opacity: 1; }
.inactive-tab { opacity: 0.4; }

/* SKELETON SHIMMER EFFECT */
.skeleton-loader {
  width: 100%; height: 100%;
  background: linear-gradient(90deg, #0a0a0a 25%, #18181b 50%, #0a0a0a 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
}
@keyframes shimmer { from { background-position: 150% 0; } to { background-position: -150% 0; } }

/* MOBILE DISABLE HOVER */
@media (hover: hover) {
  .group:hover .hover-border { border-width: 10px; border-color: #ffc200; }
  .group:hover .preview-video { transform: scale(1.2); }
}
@media (hover: none) {
  .hover-border { display: none !important; }
  .group:hover img, .group:hover .preview-video { transform: none !important; }
}

.preview-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none; transform: scale(1.01); transition: transform 0.8s ease; }
.druk-title { font-family: 'Druk Text Cyr Heavy', sans-serif; }
.garamond-font { font-family: 'EB Garamond', serif; }
.work-tile { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: #18181b; }
.tile-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.7) 100%); z-index: 5; }
</style>
