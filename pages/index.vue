<template>
  <div class="viewport">
    <div 
      class="scroll-shield" 
      @click="handleShieldClick"
      :style="{ 
        cursor: (isActualVideo && !isModalOpen) ? 'pointer' : 'default',
        pointerEvents: currentIndex === 6 ? 'none' : 'auto' 
      }"
    />

    <SiteHeader 
      class="site-header-top"
      :menu-index="currentIndex" 
      :show="logoVisible" 
      :theme-color="isAboutOrVideo ? '#ffc200' : 'black'"
      :delayed="true"
      :is-index="true"
      :hide-gradient="true" 
    />

    <div ref="container" class="container">
      <HeroSection class="panel hero-panel" />
      
      <div
        v-for="(videoId, index) in videoIds"
        :key="videoId"
        class="panel video-panel"
        :ref="el => sectionRefs[index] = el"
      >
        <component 
          v-if="Math.abs(currentIndex - (index + 1)) <= 1"
          :is="videoSections[index]" 
          :video-id="videoId" 
        />
        
        <div class="section-title-mask">
          <span class="section-title-text" v-html="titles[index + 1]" :ref="el => titleRefs[index] = el" />
        </div>

        <div class="section-caption-mask">
          <span class="section-caption-text" v-html="captions[index]" :ref="el => captionRefs[index] = el" />
        </div>
      </div>
    
      <StoryFirstSection style="top: 600dvh" :activate-carousel="showCarousel" />
    </div>

    <VideoModal 
      v-if="isModalOpen" 
      :video-id="activeVideoId" 
      :title="activeTitle" 
      :caption="activeCaption"
      @close="closeModal" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed, defineAsyncComponent } from 'vue'
import gsap from 'gsap'

useSeoMeta({
  title: 'Yevhen Pereverziev | Director & Photographer',
  description: 'Toronto-based Director and Photographer.',
})

const HeroSection = defineAsyncComponent(() => import('@/components/HeroSection.vue'))
const StoryFirstSection = defineAsyncComponent(() => import('@/components/StoryFirstSection.vue'))
const SiteHeader = defineAsyncComponent(() => import('@/components/SiteHeader.vue'))
const VideoModal = defineAsyncComponent(() => import('@/components/VideoModal.vue'))

const videoSections = [
  defineAsyncComponent(() => import('@/components/VideoSection1.vue')),
  defineAsyncComponent(() => import('@/components/VideoSection2.vue')),
  defineAsyncComponent(() => import('@/components/VideoSection3.vue')),
  defineAsyncComponent(() => import('@/components/VideoSection4.vue')),
  defineAsyncComponent(() => import('@/components/VideoSection5.vue'))
]

const container = ref(null)
const currentIndex = ref(0)
const total = 7
let animating = false
let mainObserver = null
const isModalOpen = ref(false)
const activeVideoId = ref('')
const activeTitle = ref('')
const activeCaption = ref('') 
const logoVisible = ref(false)
const showCarousel = ref(false)

const videoIds = ['1158028099', '1158027631', '1134782625', '1158824495', '1158583072']
const titles = ['', 'ALTERED STATE', 'JORDAN', 'RNR IS ASLEEP', 'PHANTOM', 'T T C']
const captions = ['Othership<br>Commercial', 'BinBaz<br>Travel Video', 'ROMES<br>Music Video', 'Trailer<br>Short Film', 'TTC<br>Creative Project']

const sectionRefs = ref([])
const titleRefs = ref([])
const captionRefs = ref([])
let lastIndex = 0

const isAboutOrVideo = computed(() => currentIndex.value >= 1 && currentIndex.value <= 6)
const isActualVideo = computed(() => currentIndex.value >= 1 && currentIndex.value <= 5)

const openModal = (id, title, fullCaption) => { 
  activeVideoId.value = id; 
  activeTitle.value = title; 
  activeCaption.value = fullCaption.split('<br>')[0]; 
  isModalOpen.value = true; 
}

const closeModal = () => {
  isModalOpen.value = false;
  nextTick(() => {
    const panels = container.value?.querySelectorAll('.panel');
    panels?.forEach(p => p.querySelector('iframe')?.contentWindow.postMessage('{"method":"play"}', '*'))
  });
};

const handleShieldClick = () => { 
  if (isActualVideo.value && !isModalOpen.value && !animating) { 
    const videoIndex = currentIndex.value - 1; 
    openModal(videoIds[videoIndex], titles[currentIndex.value], captions[videoIndex]); 
  } 
}

function animateTitle(index) {
  const title = titleRefs.value[index - 1]; if (!title) return;
  const direction = index > lastIndex ? 1 : -1;
  gsap.fromTo(title, { y: direction === 1 ? '100%' : '-100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 });
}

function animateCaption(index) {
  const caption = captionRefs.value[index - 1]; if (!caption) return;
  const direction = index > lastIndex ? 1 : -1;
  gsap.fromTo(caption, { y: direction === 1 ? '100%' : '-100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.6 });
  lastIndex = index;
}

const goTo = async (index) => {
  if (index < 0 || index >= total || animating || isModalOpen.value) return;
  animating = true;
  const panels = container.value.children; const currentPanel = panels[currentIndex.value]; const nextPanel = panels[index];
  
  if (index !== 0 && index !== 6) { 
    gsap.set(nextPanel, { scale: 0.7 }); animateTitle(index); animateCaption(index); 
  } else { 
    gsap.set(nextPanel, { scale: 1 }); 
  }
  
  currentIndex.value = index;
  const vh = window.innerHeight; 
  const tl = gsap.timeline({ onComplete: () => { animating = false; if (currentIndex.value === 6) showCarousel.value = true; } });
  
  if (currentIndex.value !== 0 && currentIndex.value !== 6) tl.to(currentPanel, { scale: 0.5, duration: 0.9, ease: 'power2.inOut' });
  tl.to(container.value, { y: -index * vh, duration: 0.9, ease: 'power4.inOut' }, '<');
  if (index !== 0 && index !== 6) tl.to(nextPanel, { scale: 1, duration: 1.5, ease: 'power3.inOut' }, '<');
};

const updateLogoSize = () => { 
  if (typeof window === 'undefined') return; 
  const vw = window.innerWidth; 
  // Restored: Desktop Aligned size (10vw)
  const titleSize = vw <= 850 ? '11vw' : '10vw';
  document.documentElement.style.setProperty('--section-title-size', titleSize); 
}

onMounted(() => {
  if (typeof window === 'undefined') return;
  updateLogoSize(); gsap.set(container.value, { y: 0 });

  if (window.hasAlreadySeenIntro) {
    logoVisible.value = true;
  } else {
    setTimeout(() => { logoVisible.value = true }, 6000);
    setTimeout(() => { 
      if (currentIndex.value === 0 && !animating && !isModalOpen.value) {
        goTo(1); 
      }
    }, 8000);
  }
  
  import('gsap/Observer').then((m) => {
    const Observer = m.default; gsap.registerPlugin(Observer);
    mainObserver = Observer.create({
      target: window, 
      type: 'wheel,touch,pointer', 
      preventDefault: false, 
      wheelSpeed: -1.2, 
      tolerance: 5,           
      dragMinimum: 0,         
      onUp: () => !animating && goTo(currentIndex.value + 1),   
      onDown: () => !animating && goTo(currentIndex.value - 1), 
      allowClicks: true, 
      ignore: ".menu-button, .rolling-link"
    });
  });

  window.addEventListener('resize', updateLogoSize);
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal() });
})

onUnmounted(() => {
  if (mainObserver) mainObserver.kill();
  window.removeEventListener('resize', updateLogoSize);
})
</script>

<style scoped>
.viewport { position: fixed; inset: 0; width: 100vw; height: 100dvh; overflow: hidden !important; touch-action: none; background-color: #ffc200; }
.container { position: relative; width: 100vw; height: 700dvh; will-change: transform; backface-visibility: hidden; }
.panel { position: absolute; width: 100vw; height: 100dvh; top: 0; left: 0; transform-origin: center center; overflow: hidden; display: flex; align-items: center; justify-content: center; will-change: transform, scale; }
.panel:nth-child(1) { top: 0dvh; z-index: 50; transform: scale(1) !important; }
.panel:nth-child(2) { top: 100dvh; }
.panel:nth-child(3) { top: 200dvh; }
.panel:nth-child(4) { top: 300dvh; }
.panel:nth-child(5) { top: 400dvh; }
.panel:nth-child(6) { top: 500dvh; }
.panel:nth-child(7) { top: 600dvh; transform: scale(1) !important; }

.scroll-shield { 
  position: fixed; 
  inset: 0; 
  z-index: 8500; 
  background: transparent; 
}

.site-header-top { 
  position: fixed; 
  top: 0; 
  left: 0; 
  width: 100%; 
  z-index: 9999 !important; 
  pointer-events: none; 
}

.site-header-top :deep(.menu-button), 
.site-header-top :deep(.rolling-link) { 
  pointer-events: auto !important; 
}

:deep(.video-modal-container) {
  z-index: 10001 !important;
}

.section-title-mask { 
  pointer-events: none; 
  position: absolute; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  overflow: hidden; 
  z-index: 10; 
  width: 100vw; 
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; 
}

.section-title-text { 
  display: inline-block; 
  font-size: var(--section-title-size); 
  font-family: 'Druk Text Cyr Heavy', sans-serif; 
  font-weight: 500; 
  letter-spacing: -0.05em; 
  text-transform: uppercase; 
  color: #ffc200; 
  line-height: 1; /* Match header SVG bounding box */
  transform: translateY(100%); 
  opacity: 0; 
  white-space: nowrap;
}

.section-caption-mask { 
  pointer-events: none; 
  position: absolute; 
  bottom: 8dvh; 
  left: 50%; 
  transform: translateX(-50%); 
  overflow: hidden; 
  z-index: 10; 
  width: 100vw; 
  text-align: center; 
}

.section-caption-text { 
  display: inline-block; 
  font-size: 1.5vw; 
  font-family: 'CanelaCustom', serif !important; 
  font-weight: 700; 
  font-style: italic; 
  color: #ffc200; 
  transform: translateY(100%); 
  opacity: 0; 
  white-space: nowrap; 
  line-height: 1.1; 
}

@media (max-width: 850px) { 
  .section-caption-text { font-size: 5vw; white-space: normal; line-height: 1.2; } 
  .section-title-text { font-size: 11vw; } 
}

:global(html), :global(body) { background-color: #ffc200; overflow: hidden; height: 100dvh; }
</style>
