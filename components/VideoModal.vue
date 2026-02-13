<template>
  <div ref="modalOverlay" class="modal-overlay" @click="handleClose">
    <div ref="modalContent" class="modal-content" @click.stop>
      
      <div class="close-wrapper" @click="handleClose" @mouseenter="onHoverClose" @mouseleave="onLeaveClose">
        <svg ref="closeIcon" viewBox="0 0 40 40" class="close-svg">
          <line x1="10" y1="10" x2="30" y2="30" stroke="currentColor" stroke-width="4" />
          <line x1="30" y1="10" x2="10" y2="30" stroke="currentColor" stroke-width="4" />
        </svg>
      </div>

      <div class="video-wrapper">
        <iframe 
          :src="`https://player.vimeo.com/video/${videoId}?autoplay=1&background=0`" 
          frameborder="0" 
          allow="autoplay; fullscreen" 
          allowfullscreen
        ></iframe>
      </div>
      
      <div ref="infoBar" class="modal-info">
        <span class="project-title">{{ title }}</span>
        <span class="project-subtitle">{{ caption }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  videoId: String,
  title: String,
  caption: String
})

const emit = defineEmits(['close'])

const modalOverlay = ref(null)
const modalContent = ref(null)
const infoBar = ref(null)
const closeIcon = ref(null)

onMounted(() => {
  const tl = gsap.timeline()
  
  // Cinematic Reveal
  tl.fromTo(modalOverlay.value, { opacity: 0 }, { opacity: 1, duration: 0.5 })
  tl.fromTo(modalContent.value, 
    { scale: 0.9, y: 20, opacity: 0 }, 
    { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }, "-=0.3"
  )
  tl.fromTo(infoBar.value, 
    { y: 15, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, "-=0.4"
  )
})

const handleClose = () => {
  gsap.to(modalOverlay.value, { 
    opacity: 0, 
    duration: 0.4, 
    onComplete: () => emit('close') 
  })
}

// Hover animation for the cross
const onHoverClose = () => {
  gsap.to(closeIcon.value, { rotation: 90, duration: 0.4, ease: 'power2.out' })
}
const onLeaveClose = () => {
  gsap.to(closeIcon.value, { rotation: 0, duration: 0.4, ease: 'power2.out' })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; z-index: 10000;
  background: rgba(0, 0, 0, 0.92);
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(10px); /* Cinematic blur */
}

.modal-content { 
  width: 90vw; max-width: 1300px; 
  position: relative; 
}

.video-wrapper { 
  aspect-ratio: 16/9; width: 100%; 
  background: #000; box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}

iframe { width: 100%; height: 100%; }

.modal-info { 
  margin-top: 2px; /* Kept it higher as requested */
  color: #ffc200; 
  text-align: left;
  
  /* NEW: Flex settings to force single line */
  display: flex;
  flex-direction: row;
  align-items: baseline;
  white-space: nowrap; 
  overflow: hidden; /* Prevents text from breaking the layout */
}

.project-title { 
  font-family: 'Druk Text Cyr Heavy', sans-serif; 
  font-size: clamp(1.1rem, 3.5vw, 2rem);
  text-transform: uppercase; 
  margin-right: 10px;
}


.project-subtitle { 
  font-family: 'CanelaCondensed', serif; 
  font-style: italic; 
  font-size: clamp(0.9rem, 1.8vw, 1.6rem); /* Lowered the minimum size for mobile */
  opacity: 0.9;
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis; /* Adds "..." if the brand name is too long for the phone */
}

/* Close Button Styling */
.close-wrapper {
  position: absolute;
  top: -50px; /* Positioned above the video */
  right: 0;
  cursor: pointer;
  color: #ffc200;
  transition: color 0.3s ease;
}

.close-svg {
  width: 40px; height: 40px;
}

@media (max-width: 850px) {
  .close-wrapper { top: -45px; right: 0; }
  .project-title { display: block; margin-bottom: 5px; font-size: 1.0rem !important; }

}
</style>