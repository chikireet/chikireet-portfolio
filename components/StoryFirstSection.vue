<template>
  <div class="panel story-panel bg-black text-white flex flex-col items-center" @click.stop>
    <div class="story-content flex-grow flex flex-col justify-start items-center w-full px-6 md:px-12 lg:px-20 pt-64 md:pt-80 pb-32 md:pb-48">
      
      <div class="w-full max-w-[1200px] text-center flex flex-col items-center">
        <div class="overflow-hidden mb-4 md:mb-6">
          <h2 class="about-title text-yellow-400 uppercase leading-[0.85]">Story First</h2>
        </div>
        <div class="mb-6 md:mb-8">
          <p class="about-body text-[#ffc200] leading-[1.4] italic mx-auto">
            Yevhen Pereverziev is a Toronto-based Director and Photographer who leads with a story-first philosophy, believing that a compelling narrative must exist before the first frame is captured.
          </p>
        </div>
        <div class="btn-container flex justify-center mb-4 md:mb-6">
          <NuxtLink to="/contact" class="collab-btn-modern">
            <span class="btn-inner">Let's Collaborate</span>
          </NuxtLink>
        </div>
      </div>

      <div class="w-full overflow-hidden relative mt-4 md:mt-8 mb-12 md:mb-20 carousel-container">
        <Transition name="carousel-fade">
          <div v-show="activateCarousel" class="carousel-track animate-scroll-slow">
            <img v-for="n in 6" :key="'a-' + n" :src="`/carousel/img${n}.avif`" decoding="async" alt="" class="carousel-img" />
            <img v-for="n in 6" :key="'b-' + n" :src="`/carousel/img${n}.avif`" decoding="async" alt="" class="carousel-img" />
          </div>
        </Transition>
        <div v-if="!activateCarousel" class="carousel-placeholder"></div>
      </div>
    </div>
    
    <SiteFooter v-if="showFooter" />
  </div>
</template>

<script setup>
defineProps({
  activateCarousel: { type: Boolean, default: false },
  showFooter: { type: Boolean, default: false }
})
</script>

<style scoped>
.story-panel { 
  position: absolute; 
  width: 100vw; 
  height: 100dvh !important; 
  left: 0; 
  top: 0; 
  z-index: 10; 
  display: flex;
  flex-direction: column;
}

.carousel-container {
  width: 100%;
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.carousel-placeholder {
  height: clamp(250px, 40vh, 500px);
  width: 100%;
  background: transparent;
}

.carousel-track { 
  display: flex; 
  gap: 2rem; 
  width: max-content; 
}

.carousel-img { 
  aspect-ratio: 16/9; 
  width: clamp(350px, 42vw, 800px); 
  border-radius: 4px; 
  object-fit: cover; 
}

.carousel-fade-enter-active { transition: opacity 1.5s ease-out, transform 1.5s ease-out; }
.carousel-fade-enter-from { opacity: 0; transform: translateY(20px); }

.btn-container { position: relative; z-index: 9999; pointer-events: auto !important; }

.about-title { font-family: 'Druk Text Cyr Heavy', sans-serif; font-size: clamp(2.3rem, 7.5vw, 7.5rem); letter-spacing: -0.04em; text-align: center; }
.about-body { 
  font-family: 'CanelaCondensed', serif; 
  font-size: clamp(1rem, 2vw, 1.7rem); 
  line-height: 1.4; 
  max-width: 85ch; 
  text-wrap: balance; 
  text-align: center;
}

.collab-btn-modern { 
  display: inline-block; 
  padding: 18px 45px; 
  border: 1px solid #ffc200; 
  color: #ffc200; 
  font-family: 'CanelaCondensed', serif; 
  font-style: italic; 
  font-size: clamp(1rem, 1.6vw, 1.4rem); 
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

@keyframes scroll-slow { 
  0% { transform: translateX(0); } 
  100% { transform: translateX(-50%); } 
}
.animate-scroll-slow { animation: scroll-slow 50s linear infinite; }

@media (max-width: 850px) { 
  /* Changed text-align from left to center for mobile */
  .about-body { text-align: center; font-size: 1.15rem; } 
  .about-title { text-align: center; }
  
  /* Reset width to auto for a centered look on mobile */
  .collab-btn-modern { width: auto; min-width: 240px; text-align: center; padding: 14px 30px; } 
  
  .story-content { 
    padding-top: 18rem !important; 
    padding-bottom: 20dvh !important; 
  } 

  .carousel-container {
    margin-top: 2rem !important;
    margin-bottom: 5rem !important;
  }

  .carousel-img { 
    width: 85vw; 
    border-radius: 6px;
  }

  .carousel-placeholder {
    height: 30vh;
  }

  .carousel-track { gap: 1rem; }
}
</style>