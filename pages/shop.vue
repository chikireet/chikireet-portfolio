<template>
  <div class="relative w-full min-h-[100dvh] bg-[#030305] overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-white/30 px-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
    
    <canvas ref="starCanvas" class="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>

    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,rgba(40,20,70,0.15)_0%,rgba(3,3,5,1)_60%)] pointer-events-none z-0"></div>

    <div class="absolute bottom-0 left-0 right-0 h-[20vh] sm:h-[25vh] overflow-visible pointer-events-none z-0">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[150px] bg-indigo-600/10 blur-[80px] rounded-full"></div>
      <div class="absolute top-[10px] left-1/2 -translate-x-1/2 w-[40vw] h-[40px] bg-purple-400/20 blur-[30px] rounded-full"></div>
      <div class="absolute top-[10px] left-1/2 -translate-x-1/2 w-[250vw] sm:w-[200vw] h-[1200px] rounded-[50%] bg-[#020204] shadow-[inset_0_2px_40px_rgba(255,255,255,0.02)]"></div>
    </div>

    <main class="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl h-full pb-[10vh]">
      
      <div class="mb-8 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md flex items-center gap-2 text-[11px] uppercase tracking-widest font-mono text-neutral-400 shadow-sm">
        <span class="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-pulse"></span>
        Waitlist • Launching June 10th
      </div>

      <h1 class="text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] font-semibold text-white tracking-tight leading-[1.1] mb-5 drop-shadow-lg max-w-[90vw]">
        Cinematic color <br />
        comes <span class="font-serif italic font-light text-neutral-300">to those who wait.</span>
      </h1>

      <p class="text-neutral-400 text-sm sm:text-base max-w-md mx-auto mb-10 leading-relaxed font-light px-2">
        Join the waitlist to secure early access and an <strong class="text-white font-medium">exclusive 10% discount</strong> for the STARFORCE LUTS pack.
      </p>

      <div class="w-full max-w-[420px] mx-auto px-2">
        <transition name="fade" mode="out-in">
          
          <form 
            v-if="!waitlistSuccess" 
            @submit.prevent="submitWaitlist" 
            class="flex items-center bg-[#0A0A0E]/80 backdrop-blur-xl border border-white/10 p-1.5 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 focus-within:border-white/30 focus-within:shadow-[0_0_30px_rgba(100,100,255,0.1)] focus-within:bg-[#0D0D12]"
          >
            <input 
              v-model="email"
              type="email" 
              placeholder="Your Email Address"
              required
              class="flex-1 bg-transparent border-none text-white px-4 py-3 text-sm focus:outline-none placeholder-neutral-500 w-full appearance-none outline-none ring-0"
            />
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="bg-white text-black font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-200 hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 whitespace-nowrap"
            >
              {{ isSubmitting ? 'Joining...' : 'Get Notified' }}
            </button>
          </form>

          <div 
            v-else 
            class="flex flex-col items-center justify-center gap-2 bg-[#0A0A0E]/80 border border-green-500/30 p-6 rounded-xl text-white backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="font-medium text-base">You're on the list.</span>
            </div>
            <span class="text-sm text-neutral-400">Check your inbox for the exclusive promo code.</span>
          </div>

        </transition>
      </div>
    </main>

    <footer class="absolute bottom-[env(safe-area-inset-bottom,2rem)] z-10 flex items-center gap-2 text-[11px] text-neutral-500 font-medium tracking-wide mb-6">
      <span>Created by</span>
      <div class="flex items-center gap-2 text-neutral-300 ml-1">
        <div class="w-5 h-5 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-500 p-[1px]">
          <div class="w-full h-full rounded-full bg-[#05050A] flex items-center justify-center text-[9px] text-white font-mono">GP</div>
        </div>
        Gene Perez
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useHead } from '#imports'; 

useHead({
  meta: [
    { name: 'theme-color', content: '#030305' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
  ]
});

const email = ref('');
const isSubmitting = ref(false);
const waitlistSuccess = ref(false);

const submitWaitlist = async () => {
  if (!email.value) return;
  isSubmitting.value = true;
  
  try {
    const response = await $fetch('/api/subscribe', {
      method: 'POST',
      body: {
        email: email.value,
        name: 'Waitlist Member',
        listId: 7 // Передаем ID нового изолированного списка STARFORCE в Brevo
      }
    });

    if (response.success) {
      waitlistSuccess.value = true;
    } else {
      console.error('Brevo API error:', response.error);
      alert('Oops! Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error('Network or Server Error:', error);
    alert('Network error. Please check your connection and try again.');
  } finally {
    isSubmitting.value = false;
  }
};

const starCanvas = ref(null);
let animationFrameId = null;

onMounted(() => {
  const canvas = starCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let stars = [];
  const starColors = ['#ffffff', '#ffffff', '#e0edff', '#ffdca8'];

  const initCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const starCount = window.innerWidth < 768 ? 1200 : 3000;
    
    stars = Array.from({ length: starCount }, () => {
      const sizeRandom = Math.random();
      let baseSize;
      let type;
      
      if (sizeRandom > 0.98) {
        baseSize = Math.random() * 1.5 + 1.0; 
        type = 'active';
      } else if (sizeRandom > 0.80) {
        baseSize = Math.random() * 0.8 + 0.6; 
        type = 'normal';
      } else {
        baseSize = Math.random() * 0.4 + 0.3; 
        type = 'background';
      }
      
      return {
        x: Math.random() * canvas.width, 
        y: Math.random() * canvas.height,
        radius: baseSize, 
        type: type,
        vx: (Math.random() - 0.5) * 0.15, 
        vy: (Math.random() - 0.5) * 0.15,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        alpha: Math.random() * 0.3 + 0.7, 
        targetAlpha: Math.random() * 0.3 + 0.7,
        twinkleSpeed: type === 'background' ? 0.002 : (Math.random() * 0.03 + 0.01),
      };
    });
  };

  const renderStars = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    
    stars.forEach(star => {
      star.x += star.vx;
      star.y += star.vy;

      if (star.x < 0) star.x = canvas.width;
      if (star.x > canvas.width) star.x = 0;
      if (star.y < 0) star.y = canvas.height;
      if (star.y > canvas.height) star.y = 0;

      if (star.type !== 'background') {
        if (Math.abs(star.alpha - star.targetAlpha) < 0.01) {
          const minA = star.type === 'active' ? 0.4 : 0.6;
          star.targetAlpha = Math.random() * (1.0 - minA) + minA;
        } else {
          star.alpha += (star.targetAlpha - star.alpha) * star.twinkleSpeed;
        }
      } else {
        star.alpha = Math.random() * 0.1 + 0.85; 
      }

      const finalAlpha = Math.max(0.1, Math.min(1.0, star.alpha));

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      
      ctx.fillStyle = star.color;
      ctx.globalAlpha = finalAlpha;
      ctx.fill();
    });
    
    ctx.globalAlpha = 1.0;
    
    animationFrameId = requestAnimationFrame(renderStars);
  };

  window.addEventListener('resize', initCanvas);
  initCanvas();
  renderStars();

  onUnmounted(() => {
    window.removeEventListener('resize', initCanvas);
    cancelAnimationFrame(animationFrameId);
  });
});
</script>

<style>
html, body, #__nuxt, #app {
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
  height: 100%;
  background-color: #030305 !important;
  overscroll-behavior: none;
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>