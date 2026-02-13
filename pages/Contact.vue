<script setup>
/**
 * SEO Agency Strategy: Local Authority & SSR Protection
 * Targeted Query: "Director and Photographer in Toronto"
 */
useSeoMeta({
  title: 'Contact Gene Perez | Director & Photographer Toronto',
  ogTitle: 'Contact Gene Perez | Director & Photographer Toronto',
  description: 'Book Gene Perez for directing, cinematography, or photography projects in Toronto. Available for global commercial and creative collaborations.',
  ogDescription: 'Available for film and photography projects in Toronto. Let’s collaborate.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
})

useHead({
  title: 'Contact Gene Perez | Director & Photographer Toronto',
  meta: [
    { name: 'description', content: 'Book Gene Perez for directing, cinematography, or photography projects in Toronto. Available for commercial and creative collaborations.' }
  ]
})

import { ref, reactive, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'

// UI State
const showMenu = ref(true)
const lastScrollY = ref(0)
const brandingRef = ref(null)
const formRef = ref(null)
const footerRef = ref(null)

// Form State
const formData = reactive({ name: '', email: '', message: '' })
const isSubmitting = ref(false)
const submitMessage = ref('')
const shakeErrors = reactive({ name: false, email: false, message: false })

const handleScroll = () => {
  const currentScrollY = window.scrollY
  showMenu.value = !(currentScrollY > lastScrollY.value && currentScrollY > 100)
  lastScrollY.value = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Page Animations
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } })
  tl.fromTo(brandingRef.value, { y: 30, opacity: 0 }, { y: 0, opacity: 1, delay: 0.3 })
    .fromTo(formRef.value, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.9")
    .fromTo(footerRef.value.$el, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.7")
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleFormSubmit = async () => {
  let hasError = false
  Object.keys(formData).forEach(key => {
    if (!formData[key] || formData[key].trim() === '') {
      shakeErrors[key] = true
      hasError = true
      setTimeout(() => { shakeErrors[key] = false }, 500)
    }
  })
  if (hasError) return

  isSubmitting.value = true
  submitMessage.value = ''
  
  const formPayload = new FormData()
  formPayload.append("access_key", "4fbed3a0-57a8-4a7e-9d2a-2aa710dc0f83")
  formPayload.append("name", formData.name)
  formPayload.append("email", formData.email)
  formPayload.append("message", formData.message)

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formPayload
    });

    const data = await response.json();

    if (response.ok) {
      submitMessage.value = "Success! Your message has been sent."
      Object.assign(formData, { name: '', email: '', message: '' })
    } else {
      submitMessage.value = "Error: " + data.message
    }
  } catch (error) {
    submitMessage.value = "Something went wrong. Please try again."
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="contact-page bg-black text-[#ffc200] antialiased">
    
    <SiteHeader 
      title="Contact" 
      link="/contact" 
      :menu-index="1" 
      :show="showMenu" 
    />

    <div class="flex flex-col md:h-screen">
      <main class="flex-grow flex flex-col items-center justify-center px-6 pt-32 md:pt-20 pb-10 relative z-0">
        <div class="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          <div ref="brandingRef" class="md:col-span-4 flex flex-col gap-6 items-center md:items-start opacity-0">
            <div class="w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#ffc200] overflow-hidden flex items-center justify-center border border-[#ffc200]/20 shadow-xl">
               <img src="/profile.jpg" alt="Gene Perez - Professional Director and Photographer in Toronto" class="w-full h-full object-cover" />
            </div>
            <h1 class="garamond-title text-4xl md:text-6xl italic leading-tight text-center md:text-left tracking-tight">
              Let's Collaborate
            </h1>
          </div>

          <div ref="formRef" class="md:col-span-8 flex flex-col gap-4 opacity-0">
            <div class="text-center md:text-left mb-2">
              <span class="garamond-text italic text-lg opacity-80 block mb-1">Director / Photographer</span>
              <h2 class="druk-title text-4xl md:text-7xl uppercase leading-[0.9] tracking-tighter">
                Gene Perez
              </h2>
            </div>

            <form @submit.prevent="handleFormSubmit" class="flex flex-col gap-3">
              <input aria-label="Name" type="text" v-model="formData.name" placeholder="Name" class="contact-input" :class="{ 'shake-input': shakeErrors.name }" />
              <input aria-label="Email" type="email" v-model="formData.email" placeholder="Email" class="contact-input" :class="{ 'shake-input': shakeErrors.email }" />
              <textarea aria-label="Project details" v-model="formData.message" placeholder="Project details..." rows="3" class="contact-input resize-none" :class="{ 'shake-input': shakeErrors.message }"></textarea>
              
              <button type="submit" :disabled="isSubmitting" class="submit-btn">
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
            
            <Transition name="fade">
              <p v-if="submitMessage" class="garamond-text italic text-center mt-2 text-[#ffc200]">{{ submitMessage }}</p>
            </Transition>
          </div>
        </div>
      </main>

      <SiteFooter ref="footerRef" class="opacity-0" />
    </div>
  </div>
</template>

<style scoped>
:global(html), :global(body) {
  overflow-y: auto !important;
  overflow-x: hidden !important;
  height: auto !important;
  position: relative !important;
}

.druk-title { font-family: 'Druk Text Cyr Heavy', sans-serif; }
.garamond-title, .garamond-text { font-family: 'EB Garamond', serif; }

.contact-input {
  @apply w-full bg-transparent border border-[#ffc200]/30 p-3 text-[#ffc200] 
         focus:border-[#ffc200] outline-none transition-all garamond-text text-lg;
}

.contact-input::placeholder {
  color: #cc9900;
  opacity: 0.6;
  font-style: italic;
}

.shake-input {
  border-color: #ff3434 !important; 
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

.submit-btn {
  @apply bg-[#ffc200] text-black font-bold uppercase py-4 tracking-widest 
         hover:bg-white transition-colors disabled:opacity-50 cursor-pointer;
}

@media (max-width: 850px) {
  .garamond-title { font-size: 2.8rem; text-align: center; }
  main {
    padding-top: 120px;
    justify-content: flex-start;
  }
}
</style>