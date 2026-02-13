<script setup>
/**
 * SEO Agency Strategy: Digital Asset Authority
 */
useSeoMeta({
  title: 'Shop Digital Assets | Gene Perez Toronto Director',
  ogTitle: 'Gene Perez Shop | Coming Soon',
  description: 'The official store for professional filmmaking assets, LUTs, and photography presets by Toronto-based Director Gene Perez. Sign up for early access.',
  // FIXED: Escaped the single quote to prevent syntax error
  ogDescription: 'The store isn\'t open yet, but trust me, it\'ll be worth the wait.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
})

useHead({
  title: 'Shop Digital Assets | Gene Perez Toronto Director',
  meta: [
    { name: 'description', content: 'The official store for professional filmmaking assets, LUTs, and photography presets by Toronto-based Director Gene Perez. Sign up for early access.' }
  ]
})

import { ref, onMounted, onUnmounted } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const showMenu = ref(true)
const lastScrollY = ref(0)
const particles = ref([])
const email = ref('')
const isSubmitting = ref(false)
const submitted = ref(false)

const createParticles = () => {
  for (let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 150 + Math.random() * 200;
    particles.value.push({
      id: i, delay: Math.random() * 4, tx: Math.cos(angle) * distance, ty: Math.sin(angle) * distance, rot: Math.random() * 360, size: 4 + Math.random() * 8
    })
  }
}

const handleSubmit = async () => {
  isSubmitting.value = true;
  const formData = new FormData();
  formData.append("access_key", "026695d8-0881-4db5-97c6-8ca5680b09bf");
  formData.append("email", email.value);
  formData.append("subject", "Store Notification Request");

  try {
    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
    if (res.ok) { submitted.value = true; email.value = ''; }
  } catch (e) { alert("Error sending request."); }
  finally { isSubmitting.value = false; }
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  showMenu.value = !(currentScrollY > lastScrollY.value && currentScrollY > 100)
  lastScrollY.value = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  createParticles()
})

onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <div class="min-h-screen bg-black antialiased overflow-x-hidden flex flex-col">
    <SiteHeader 
      title="Shop" 
      link="/shop" 
      :menu-index="4" 
      :show="showMenu" 
    />

    <main class="relative z-10 px-8 flex flex-col items-center text-center max-w-4xl mx-auto flex-grow justify-center">
      <Transition name="fade" mode="out-in">
        <div v-if="submitted" class="py-20 appear-animate flex flex-col items-center">
          <h2 class="druk-title text-[#ffc200] text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-6">
            Thank You
          </h2>
          <p class="garamond-font text-[#ffc200] text-2xl md:text-3xl italic tracking-wide mb-12">
            You're on the list. I'll reach out soon.
          </p>
          
          <NuxtLink to="/" class="druk-title text-[#ffc200] text-2xl md:text-3xl uppercase tracking-tighter hover:opacity-70 transition-opacity">
            Return Home
          </NuxtLink>
        </div>

        <div v-else class="appear-animate">
          <div class="relative inline-block py-10 px-20">
            <h1 class="magical-text druk-title text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.85] relative z-10">
              Coming Soon
            </h1>
            
            <div class="particle-container">
              <div v-for="p in particles" :key="p.id" 
                   class="star-particle"
                   :style="{ 
                     left: '50%', top: '50%', animationDelay: p.delay + 's',
                     '--tx': p.tx + 'px', '--ty': p.ty + 'px', '--rot': p.rot + 'deg', '--size': p.size + 'px'
                   }">
                <svg viewBox="0 0 24 24" fill="#ffc200" :style="{ width: p.size + 'px' }">
                  <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
                </svg>
              </div>
            </div>
          </div>
          
          <p class="garamond-font text-[#ffc200] text-xl md:text-2xl italic tracking-wide mb-12 opacity-90 max-w-2xl mx-auto">
            The store isn't open yet, but trust me, it'll be worth the wait.
          </p>

          <form @submit.prevent="handleSubmit" class="w-full max-w-xs space-y-8 mx-auto">
            <input 
              v-model="email"
              type="email" 
              placeholder="Enter your email address" 
              class="w-full bg-transparent border border-[#ffc200]/30 py-4 px-6 garamond-font text-[#ffc200] text-xl focus:outline-none focus:border-[#ffc200] transition-colors placeholder:text-[#ffc200]/40 text-center"
              aria-label="Email for Early Access"
              required
            />
            
            <button type="submit" :disabled="isSubmitting" class="hover:opacity-70 transition-opacity disabled:opacity-50">
              <span class="druk-title text-[#ffc200] text-2xl md:text-3xl uppercase tracking-tighter">
                {{ isSubmitting ? 'Sending...' : 'Notify Me' }}
              </span>
            </button>
          </form>
        </div>
      </Transition>
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
:global(html), :global(body) { 
  background-color: black !important; 
  height: auto !important;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.magical-text {
  background: linear-gradient(90deg, #ffc200 0%, #fff 25%, #ffc200 50%, #fff 75%, #ffc200 100%);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shine 4s linear infinite;
  text-shadow: 0 0 20px rgba(255, 194, 0, 0.4);
}

@keyframes shine { to { background-position: 200% center; } }

.particle-container { position: absolute; inset: 0; pointer-events: none; z-index: 5; }
.star-particle {
  position: absolute; transform: translate(-50%, -50%); opacity: 0;
  animation: star-radiate 4s ease-out infinite;
}

@keyframes star-radiate {
  0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 0.8; }
  100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1) rotate(var(--rot)); opacity: 0; }
}

.druk-title { font-family: 'Druk Text Cyr Heavy', sans-serif; }
.garamond-font, .garamond-text { font-family: 'EB Garamond', serif; }

.appear-animate { animation: fade-up 1.2s forwards; }
@keyframes fade-up { 
  from { opacity: 0; transform: translateY(30px); } 
  to { opacity: 1; transform: translateY(0); } 
}
</style>