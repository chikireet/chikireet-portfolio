<template>
  <section class="bg-black py-12 px-4 md:px-8">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-center garamond-font italic text-[#ffc200] text-lg opacity-80 mb-6">
        Drag to compare (Apple Log vs Graded)
      </h2>

      <div 
        ref="sliderContainer"
        @mousemove="handleMove"
        @touchmove="handleMove"
        class="relative aspect-video w-full overflow-hidden cursor-ew-resize select-none border border-[#ffc200]/20 bg-[#0a0a0a]"
      >
        <div class="absolute inset-0 w-full h-full">
          <img 
            src="/images/store/after-preview.jpg" 
            alt="Graded with Kodak Vision3" 
            class="w-full h-full object-cover pointer-events-none"
          />
          <span class="absolute bottom-4 right-4 bg-black/80 border border-[#ffc200]/30 text-xs text-[#ffc200] px-3 py-1 font-mono tracking-widest uppercase">GRADED</span>
        </div>

        <div 
          class="absolute inset-0 w-full h-full"
          :style="{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }"
        >
          <img 
            src="/images/store/before-preview.jpg" 
            alt="Original Apple Log" 
            class="w-full h-full object-cover pointer-events-none" 
          />
          <span class="absolute bottom-4 left-4 bg-black/80 border border-[#ffc200]/30 text-xs text-[#ffc200] px-3 py-1 font-mono tracking-widest uppercase">APPLE LOG</span>
        </div>

        <div 
          class="absolute top-0 bottom-0 w-[1.5px] bg-[#ffc200] pointer-events-none z-20 shadow-[0_0_10px_rgba(255,194,0,0.5)]"
          :style="{ left: `${sliderPos}%` }"
        >
          <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-black text-[#ffc200] border border-[#ffc200] flex items-center justify-center text-xs font-mono tracking-tighter">
            &lt;&gt;
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const sliderContainer = ref(null)
const sliderPos = ref(50)

function handleMove(e) {
  if (!sliderContainer.value) return
  const rect = sliderContainer.value.getBoundingClientRect()
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const x = clientX - rect.left
  let percentage = (x / rect.width) * 100
  if (percentage < 0) percentage = 0
  if (percentage > 100) percentage = 100
  sliderPos.value = percentage
}
</script>

<style scoped>
.garamond-font { font-family: 'EB Garamond', serif; }
</style>