<template>
  <div class="panel story-panel bg-black text-white flex flex-col items-center" @click.stop>
    <div class="flex-grow flex flex-col justify-start items-center w-full px-6 md:px-12 lg:px-20 pt-40 md:pt-52">
      
      <div class="w-full max-w-[1200px] text-left md:text-center flex flex-col items-start md:items-center">
        <div class="overflow-hidden mb-8 md:mb-10">
          <h2 class="about-title text-yellow-400 uppercase leading-[0.85]">Story First</h2>
        </div>
        <div class="mb-10 md:mb-12">
          <p class="about-body text-[#ffc200] leading-[1.4] italic">
            Gene Perez is a Toronto-based Director and Photographer who leads with a story-first philosophy, believing that a compelling narrative must exist before the first frame is captured.
          </p>
        </div>
        <div class="btn-container mb-12 md:mb-2">
          <NuxtLink to="/contact" class="collab-btn-modern">
            <span class="btn-inner">Let's Collaborate</span>
          </NuxtLink>
        </div>
      </div>

      <div class="w-full overflow-hidden relative mt-12 md:mt-10 carousel-container">
        <Transition name="carousel-fade">
          <div v-show="activateCarousel" class="carousel-track animate-scroll-slow">
            
            <NuxtImg 
              v-for="(img, idx) in carouselData" 
              :key="'a-' + idx" 
              :src="img.src" 
              :alt="img.alt" 
              format="webp"
              quality="80"
              sizes="sm:260px md:30vw lg:550px"
              :loading="idx < 2 ? 'eager' : 'lazy'"
              :fetchpriority="idx < 2 ? 'high' : 'auto'"
              class="carousel-img" 
            />

            <NuxtImg 
              v-for="(img, idx) in carouselData" 
              :key="'b-' + idx" 
              :src="img.src" 
              :alt="img.alt" 
              format="webp"
              quality="80"
              sizes="sm:260px md:30vw lg:550px"
              loading="lazy"
              class="carousel-img" 
            />
          </div>
        </Transition>
        
        <div v-if="!activateCarousel" class="h-[150px] md:h-[300px] w-full bg-transparent"></div>
      </div>
    </div>
    <SiteFooter />
  </div>
</template>

<script setup>
defineProps({
  activateCarousel: { type: Boolean, default: false }
})

/**
 * Данные карусели с SEO-оптимизированными описаниями
 */
const carouselData = [
  { src: '/carousel/img1.avif', alt: 'Toronto Director Gene Perez operating a professional camera rig in a smoky studio environment' },
  { src: '/carousel/img2.avif', alt: 'Cinematographer Gene Perez setting up a lighting tube for a night shoot in Toronto' },
  { src: '/carousel/img3.avif', alt: 'Behind the scenes of a cinematic urban production with Director Gene Perez and film crew' },
  { src: '/carousel/img4.avif', alt: 'Gene Perez using FPV drone goggles for a professional video production in Toronto' },
  { src: '/carousel/img5.avif', alt: 'Director Gene Perez filming a high-contrast cinematic scene of an athlete in a bathtub' },
  { src: '/carousel/img6.avif', alt: 'Behind the scenes of a professional commercial production in a sauna directed by Gene Perez' }
]
</script>

<style scoped>
/* Контейнер карусели с эффектом затухания по краям */
.carousel-container {
  width: 100%;
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  min-height: 200px;
}

.carousel-track {
  display: flex;
  gap: 1rem;
  width: max-content; 
}

/* Анимация появления */
.carousel-fade-enter-active { 
  transition: opacity 1.5s ease-out, transform 1.5s ease-out; 
}
.carousel-fade-enter-from { 
  opacity: 0; 
  transform: translateY(20px);
}

.story-panel { position: absolute; width: 100vw; height: 100vh; left: 0; top: 0; z-index: 10; }
.btn-container { position: relative; z-index: 9999; pointer-events: auto !important; }

/* Типографика */
.about-title { font-family: 'Druk Text Cyr Heavy', sans-serif; font-size: clamp(3rem, 8.5vw, 7.5rem); letter-spacing: -0.04em; }
.about-body { font-family: 'CanelaCondensed', serif; font-size: clamp(1.1rem, 2.1vw, 1.7rem); line-height: 1.4; max-width: 85ch; text-wrap: balance; }

/* Кнопка */
.collab-btn-modern { 
  display: inline-block; 
  padding: 18px 45px; 
  border: 1px solid #ffc200; 
  color: #ffc200; 
  font-family: 'CanelaCondensed', serif; 
  font-style: italic; 
  font-size: clamp(1.1rem, 1.8vw, 1.5rem); 
  text-decoration: none; 
  border-radius: 100px; 
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1); 
  background: transparent; 
  cursor: pointer !important; 
}

.collab-btn-modern:hover { 
  background: #ffc200; 
  color: #000000; 
  transform: translateY(-5px); 
  box-shadow: 0 10px 30px rgba(255, 194, 0, 0.3); 
}

/* Стили изображений в карусели */
.carousel-img { 
  aspect-ratio: 16/9; 
  width: clamp(260px, 30vw, 550px); 
  border-radius: 2px; 
  object-fit: cover; 
  will-change: transform; 
  background: #1a1a1a;
  flex-shrink: 0;
}

/* Бесконечная анимация */
@keyframes scroll-slow { 
  0% { transform: translateX(0); } 
  100% { transform: translateX(-50%); } 
}

.animate-scroll-slow { 
  animation: scroll-slow 50s linear infinite; 
}

/* Адаптивность для мобильных */
@media (max-width: 850px) { 
  .about-body { text-align: left; font-size: 1.25rem; } 
  .collab-btn-modern { width: 100%; text-align: center; padding: 14px 30px; } 
}
</style>