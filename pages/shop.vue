<template> 
  <div class="brand-clean-shell bg-[#F9F9FB] text-[#111113] min-h-screen font-inter selection:bg-[#5A1BD1]/10 overflow-hidden pb-10">
    
    <header :class="['fixed top-[14px] left-1/2 -translate-x-1/2 z-[100] flex items-center gap-6 md:gap-8 pl-6 pr-3 py-2.5 bg-[#FFFFFF]/75 backdrop-blur-xl border border-[#111113]/5 rounded-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 opacity-0 transform translate-y-[-10px]', { '!opacity-100 !translate-y-0': isHeaderRevealed }]">
      <div class="text-xl font-medium tracking-tight text-[#111113] select-none shrink-0 whitespace-nowrap">GENE<span class="font-instrument font-normal italic text-[#5A1BD1]">PEREZ</span></div>
      
      <nav class="hidden md:flex items-center gap-6 text-xs font-medium text-[#666668]">
        <a href="#niches" class="hover:text-[#111113] transition duration-200 whitespace-nowrap">Направления</a>
        <a href="#impact" class="hover:text-[#111113] transition duration-200 whitespace-nowrap">Что дает бренду</a>
        <a href="#reviews" class="hover:text-[#111113] transition duration-200 whitespace-nowrap">Отзывы</a>
        <a href="#faq" class="hover:text-[#111113] transition duration-200 whitespace-nowrap">FAQ</a>
      </nav>

      <div class="flex items-center gap-3 shrink-0">
        <a href="#cta" class="bg-[#5A1BD1] text-[#FFFFFF] px-5 py-2 rounded-full text-xs font-medium hover:bg-[#4914b0] transition duration-200 shrink-0 whitespace-nowrap shadow-sm">
          Обсудить проект
        </a>
      </div>
    </header>

    <section class="pt-32 md:pt-40 pb-20 px-4 flex flex-col items-center text-center max-w-[1200px] mx-auto">
      <div :class="['inline-flex items-center gap-3.5 px-5 py-2.5 rounded-full border border-[#111113]/5 bg-[#FFFFFF] text-xs md:text-sm font-normal text-[#666668] mb-8 reveal-init shadow-sm', { 'reveal-active': isPillRevealed }]">
        <span class="w-2 h-2 rounded-full bg-[#5A1BD1] shadow-[0_0_10px_rgba(90,27,209,0.4)] animate-pulse"></span>
        Эксклюзивный видео-продакшн & Веб-презентация
      </div>
      
      <h1 class="text-[38px] md:text-[90px] font-medium leading-[44px] md:leading-[100px] tracking-[-1.5px] md:tracking-[-4px] text-[#111113] mb-8 overflow-hidden flex flex-col items-center">
        <span :class="['reveal-line reveal-init whitespace-nowrap', { 'reveal-active': isH1Line1Revealed }]">Кастомная страница</span>
        <span :class="['reveal-line font-instrument font-normal italic md:tracking-normal text-[#5A1BD1] pt-1 reveal-init', { 'reveal-active': isH1Line2Revealed }]">для вашего бренда.</span>
      </h1>
      
      <p :class="['text-base md:text-[24px] font-medium md:leading-[36px] md:tracking-[-0.4px] text-[#666668] mb-12 max-w-3xl reveal-init', { 'reveal-active': isElementsRevealed }]">
        Создаем уникальное цифровое пространство с концептуальным видео, которое полностью погружает клиента в атмосферу вашей студии еще до её посещения.
      </p>
      
      <div :class="['flex flex-col sm:flex-row gap-4 mb-20 w-full sm:w-auto px-4 justify-center reveal-init', { 'reveal-active': isElementsRevealed }]">
        <a href="#cta" class="bg-[#5A1BD1] text-[#FFFFFF] px-8 py-4 rounded-full font-medium hover:bg-[#4914b0] transition shadow-[0_10px_30px_rgba(90,27,209,0.15)] whitespace-nowrap text-sm md:text-base text-center">
          Запустить разработку
        </a>
      </div>

      <div v-reveal class="w-full rounded-[32px] md:rounded-[48px] bg-[#FFFFFF] p-2 border border-[#111113]/5 custom-inner-bevel relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)]">
        <div class="rounded-[26px] md:roundedxl overflow-hidden aspect-video relative group z-0 bg-[#F3F3F6]">
          <video autoplay muted loop playsinline class="w-full h-full object-cover">
            <source src="https://www.dropbox.com/scl/fi/ke4fvbwkzuc8b40csx6m7/hero-4.mov?rlkey=uqdajhqtuqi4ids1eh0hk2giw&st=m7rgm3sv&raw=1" type="video/mp4">
            Ваш браузер не поддерживает видео.
          </video>
        </div>
      </div>
    </section>

    <section id="niches" class="px-4 max-w-[1200px] mx-auto mb-16 scroll-mt-24">
      <div class="bg-[#FFFFFF] rounded-[32px] md:rounded-[48px] py-16 md:py-28 px-4 md:px-16 flex flex-col items-center text-center custom-inner-bevel border border-[#111113]/5 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
        <div class="relative z-20 flex flex-col items-center w-full">
          <div v-reveal class="inline-flex items-center justify-center px-5 py-2 rounded-full border border-[#111113]/5 bg-[#F9F9FB] text-xs text-[#666668] mb-8 font-medium">
            Для кого это создано
          </div>
          
          <h2 class="text-3xl md:text-[60px] font-medium leading-[38px] md:leading-[72px] md:tracking-[-2.5px] text-[#111113] mb-6 flex flex-col items-center">
            <span v-reveal class="reveal-line">Фокус на индустрии <span class="font-instrument font-normal italic text-[#5A1BD1]">Wellness & Спорта</span></span>
          </h2>
          
          <p v-reveal class="text-base md:text-[20px] font-medium text-[#666668] mb-16 max-w-2xl">
            Каждое пространство имеет свою философию. Мы переносим её в онлайн через премиальный визуал и выверенный UX.
          </p>

          <div class="grid md:grid-cols-2 gap-6 md:gap-8 w-full text-left">
            <div v-reveal class="bg-[#F9F9FB] border border-[#111113]/5 rounded-[24px] md:rounded-3xl p-6 md:p-10 custom-inner-bevel flex flex-col justify-between hover:border-[#5A1BD1]/20 transition-all duration-300">
              <div>
                <div class="w-12 h-12 rounded-2xl bg-[#FFFFFF] flex items-center justify-center text-xl mb-8 border border-[#111113]/5 shadow-sm">🌿</div>
                <h3 class="text-2xl md:text-[30px] font-medium tracking-[-0.5px] text-[#111113] mb-4">Сауны & Wellness пространства</h3>
                <p class="text-sm md:text-base font-medium leading-[24px] text-[#666668]">
                  Передаем физическое ощущение тепла, покоя и уединения через экраны. Видео-арт глубинного расслабления, эстетика пара и воды, создающие мгновенное желание забронировать визит.
                </p>
              </div>
              <div class="mt-8 pt-4 border-t border-[#111113]/5 flex items-center text-xs font-semibold text-[#5A1BD1] tracking-wider uppercase">
                Атмосфера погружения • Релакс • Премиум
              </div>
            </div>

            <div v-reveal class="bg-[#F9F9FB] border border-[#111113]/5 rounded-[24px] md:rounded-3xl p-6 md:p-10 custom-inner-bevel flex flex-col justify-between hover:border-[#5A1BD1]/20 transition-all duration-300">
              <div>
                <div class="w-12 h-12 rounded-2xl bg-[#FFFFFF] flex items-center justify-center text-xl mb-8 border border-[#111113]/5 shadow-sm">⚡</div>
                <h3 class="text-2xl md:text-[30px] font-medium tracking-[-0.5px] text-[#111113] mb-4">Фитнес-студии & Бутик-залы</h3>
                <p class="text-sm md:text-base font-medium leading-[24px] text-[#666668]">
                  Динамика, эстетика тела, архитектура зала и энергия тренеров. Показываем ритм и сильный бренд, который привлекает аудиторию, ценящую качество и статус, а не просто "абонемент со скидкой".
                </p>
              </div>
              <div class="mt-8 pt-4 border-t border-[#111113]/5 flex items-center text-xs font-semibold text-[#5A1BD1] tracking-wider uppercase">
                Энергия • Движение • Сообщество
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="impact" class="px-4 max-w-[1200px] mx-auto mb-16 scroll-mt-24">
      <div class="bg-[#FFFFFF] rounded-[32px] md:rounded-[48px] py-16 md:py-28 px-4 md:px-16 flex flex-col items-center text-center custom-inner-bevel border border-[#111113]/5 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
        <div class="relative z-20 flex flex-col items-center w-full">
          <div v-reveal class="inline-flex items-center justify-center px-5 py-2 rounded-full border border-[#111113]/5 bg-[#F9F9FB] text-xs text-[#666668] mb-8 font-medium">
            Сила бренда
          </div>
          
          <h2 class="text-3xl md:text-[60px] font-medium leading-[38px] md:leading-[72px] md:tracking-[-2.5px] text-[#111113] mb-6 flex flex-col items-center">
            <span v-reveal class="reveal-line">Инструмент, который</span>
            <span v-reveal class="reveal-line font-instrument font-normal italic text-[#5A1BD1] pt-2">усиливает ваш масштаб</span>
          </h2>
          
          <p v-reveal class="text-base md:text-[20px] font-medium text-[#666668] mb-16 max-w-2xl">
            Это не просто визитка. Это полноценная цифровая презентация, закрывающая любые сомнения гостя.
          </p>

          <div class="grid md:grid-cols-3 gap-6 w-full text-left">
            <div v-reveal class="bg-[#F9F9FB] border border-[#111113]/5 rounded-2xl p-6 md:p-8 custom-inner-bevel">
              <div class="text-2xl mb-4">💎</div>
              <h4 class="text-lg font-bold text-[#111113] mb-2">Обособление от рынка</h4>
              <p class="text-sm text-[#666668] leading-relaxed">Шаблонные сайты и безликие соцсети не передают ценность. Уникальная страница задает новый стандарт восприятия вашего бизнеса.</p>
            </div>
            
            <div v-reveal class="bg-[#F9F9FB] border border-[#111113]/5 rounded-2xl p-6 md:p-8 custom-inner-bevel">
              <div class="text-2xl mb-4">👁️</div>
              <h4 class="text-lg font-bold text-[#111113] mb-2">Эстетика как аргумент</h4>
              <p class="text-sm text-[#666668] leading-relaxed">Клиент видит кинематографичные ракурсы, свет, чистоту и детали пространства до прихода. Визуальный контент продает на уровне эмоций.</p>
            </div>

            <div v-reveal class="bg-[#F9F9FB] border border-[#111113]/5 rounded-2xl p-6 md:p-8 custom-inner-bevel">
              <div class="text-2xl mb-4">📈</div>
              <h4 class="text-lg font-bold text-[#111113] mb-2">Повышение LTV и чека</h4>
              <p class="text-sm text-[#666668] leading-relaxed">Премиальное позиционирование позволяет обоснованно удерживать высокий уровень цен и привлекать осознанную, лояльную аудиторию.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="reviews" class="px-4 max-w-[1200px] mx-auto mb-16 scroll-mt-24">
      <div class="bg-[#FFFFFF] rounded-[32px] md:rounded-[48px] py-16 md:py-28 px-4 md:px-16 flex flex-col items-center text-center custom-inner-bevel border border-[#111113]/5 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
        <div class="relative z-20 flex flex-col items-center w-full">
          <div v-reveal class="inline-flex items-center justify-center px-5 py-2 rounded-full border border-[#111113]/5 bg-[#F9F9FB] text-xs text-[#666668] mb-8 font-medium">
            Отзывы клиентов
          </div>
          
          <h2 class="text-3xl md:text-[60px] font-medium leading-[38px] md:leading-[72px] md:tracking-[-2.5px] text-[#111113] mb-6 flex flex-col items-center">
            <span v-reveal class="reveal-line">Что говорят создатели <br/> <span class="font-instrument font-normal italic text-[#5A1BD1]">топ-пространств</span></span>
          </h2>
          
          <p v-reveal class="text-base md:text-[20px] font-medium text-[#666668] mb-16 max-w-2xl">
            Опыт тех, кто уже перевел визуальное присутствие своего бренда на кинематографический уровень.
          </p>

          <div class="grid md:grid-cols-3 gap-6 w-full text-left">
            <div v-reveal v-for="(review, index) in reviews" :key="index" 
                 class="bg-[#F9F9FB] border border-[#111113]/5 p-6 rounded-2xl custom-inner-bevel flex flex-col justify-between transition hover:border-[#5A1BD1]/20 duration-300">
              <div>
                <div class="flex gap-0.5 text-amber-500 text-xs mb-4">
                  <span v-for="star in 5" :key="star">★</span>
                </div>
                <p class="text-sm md:text-base font-normal leading-[24px] text-[#111113]/90 mb-6 italic">
                  "{{ review.text }}"
                </p>
              </div>
              <div class="flex items-center gap-3 border-t border-[#111113]/5 pt-4">
                <div class="w-10 h-10 rounded-full bg-[#111113]/5 flex items-center justify-center font-bold text-xs text-[#5A1BD1] select-none">
                  {{ review.name[0] }}
                </div>
                <div class="flex flex-col min-w-0">
                  <h4 class="text-sm font-bold text-[#111113] truncate">{{ review.name }}</h4>
                  <p class="text-xs text-neutral-400 font-mono truncate">{{ review.role }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="py-16 max-w-3xl mx-auto px-4 scroll-mt-24">
      <div class="text-center mb-12">
        <div v-reveal class="inline-flex items-center justify-center px-5 py-2 rounded-full border border-[#111113]/5 bg-[#FFFFFF] text-xs text-[#666668] mb-8 font-medium shadow-sm">
          Вопросы и ответы
        </div>
        <h2 class="text-3xl md:text-4xl font-medium text-[#111113] tracking-[-1.5px] flex flex-col items-center">
          <span v-reveal class="reveal-line">Часто задаваемые <span class="font-instrument font-normal italic text-[#5A1BD1]">вопросы</span></span>
        </h2>
      </div>

      <div class="space-y-4">
        <div v-reveal v-for="(item, index) in faqs" :key="index" class="rounded-2xl bg-[#FFFFFF] border border-[#111113]/5 overflow-hidden transition-all duration-300 custom-inner-bevel shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
          <button @click="toggleFaq(index)" class="w-full px-5 py-5 md:px-6 md:py-5 text-left flex justify-between items-center font-medium text-base text-[#111113]">
            {{ item.q }}
            <span class="text-xl font-light transition-transform duration-300 text-neutral-400" :class="{ 'rotate-180 text-[#5A1BD1]': openFaq === index }">↓</span>
          </button>
          <div v-show="openFaq === index" class="px-5 pb-6 md:px-6 md:pb-6 text-[#666668] text-sm md:text-base leading-relaxed border-t border-[#111113]/5 pt-4">
            {{ item.a }}
          </div>
        </div>
      </div>
    </section>

    <section id="cta" class="py-16 md:py-24 px-4 flex flex-col items-center scroll-mt-24">
      <div v-reveal class="relative w-full max-w-xl bg-[#FFFFFF] border border-[#111113]/5 rounded-[32px] p-6 md:p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.04)] custom-inner-bevel">
        
        <div class="relative z-20 flex flex-col">
          <span class="text-xs font-mono uppercase tracking-widest text-[#5A1BD1] font-bold mb-3 block">Давайте обсудим концепт</span>
          <h3 class="text-2xl md:text-3xl font-medium text-[#111113] tracking-tight mb-4">
            Создайте страницу, которая <br/>
            <span class="font-instrument font-normal italic text-[#5A1BD1]">оставит конкурентов позади</span>
          </h3>
          <p class="text-[#666668] text-sm mb-8 font-normal leading-relaxed">
            Оставьте заявку. Мы изучим специфику вашей студии или велнес-пространства и предложим персональное визуальное решение.
          </p>

          <form @submit.prevent="submitInquiry" class="space-y-4">
            <div>
              <input v-model="formName" type="text" placeholder="Ваше имя / Компания" required class="w-full bg-[#F9F9FB] border border-[#111113]/10 rounded-xl px-4 py-3.5 text-[#111113] placeholder-neutral-400 focus:border-[#5A1BD1]/50 focus:ring-1 focus:ring-[#5A1BD1]/50 outline-none transition-all duration-300 text-sm font-medium" />
            </div>
            <div>
              <input v-model="formContact" type="text" placeholder="Телефон или Telegram / Email" required class="w-full bg-[#F9F9FB] border border-[#111113]/10 rounded-xl px-4 py-3.5 text-[#111113] placeholder-neutral-400 focus:border-[#5A1BD1]/50 focus:ring-1 focus:ring-[#5A1BD1]/50 outline-none transition-all duration-300 text-sm font-medium" />
            </div>
            <div>
              <textarea v-model="formMessage" placeholder="Расскажите коротко о вашем пространстве (город, ниша, идея)" rows="3" class="w-full bg-[#F9F9FB] border border-[#111113]/10 rounded-xl px-4 py-3.5 text-[#111113] placeholder-neutral-400 focus:border-[#5A1BD1]/50 focus:ring-1 focus:ring-[#5A1BD1]/50 outline-none transition-all duration-300 text-sm font-medium resize-none"></textarea>
            </div>

            <div class="pt-2">
              <button type="submit" :disabled="isSubmitting" class="w-full bg-[#5A1BD1] text-[#FFFFFF] font-semibold text-sm px-6 py-4 rounded-xl transition-all duration-300 tracking-wide focus:outline-none disabled:opacity-50 shadow-md hover:bg-[#4914b0]">
                {{ isSubmitting ? 'ОТПРАВКА...' : 'ПОЛУЧИТЬ ПЕРСОНАЛЬНЫЙ КОНЦЕПТ' }}
              </button>
            </div>
          </form>

          <div v-if="isSuccess" class="mt-4 p-4 bg-green-500/5 border border-green-500/20 rounded-xl text-center text-green-600 text-sm font-medium animate-fade-in">
            Спасибо! Заявка успешно принята, мы свяжемся с вами в ближайшее время.
          </div>
        </div>
      </div>
    </section>

    <footer class="pt-16 pb-4 px-4 md:px-8 max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center text-xs md:text-sm font-medium text-[#666668] gap-4 border-t border-[#111113]/5">
      <div class="flex flex-wrap justify-center gap-4 md:gap-6 mb-4 md:mb-0">
        <a href="#niches" class="hover:text-[#111113] transition">Направления</a>
        <a href="#impact" class="hover:text-[#111113] transition">Бренд</a>
        <a href="#reviews" class="hover:text-[#111113] transition">Отзывы</a>
      </div>
      <div class="whitespace-nowrap text-center md:text-right">
        Director & Photographer • <span class="text-[#111113]">Gene Perez</span>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Анимация появления при скролле (Intersection Observer директива)
const vReveal = {
  mounted: (el) => {
    el.classList.add('reveal-init')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-active')
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" })
    observer.observe(el)
  }
}

// Контроллеры появления Hero элементов при загрузке
const isHeaderRevealed = ref(false)
const isPillRevealed = ref(false)
const isH1Line1Revealed = ref(false)
const isH1Line2Revealed = ref(false)
const isElementsRevealed = ref(false)

// Отзывы владельцев велнес и фитнес-бизнесов
const reviews = ref([
  { 
    name: 'Александр Д.', 
    role: 'Основатель Wellness-терм', 
    text: 'Кастомная страница с видео позволила передать ту самую текстуру пара и уединения, которую невозможно описать текстом. Наш чек вырос, пришли клиенты, ценящие приватность.', 
  },
  { 
    name: 'Светлана К.', 
    role: 'CEO Бутик-студии пилатеса', 
    text: 'Экран ожил. Вместо банальных фотографий тренажеров люди видят философию движения. Это укрепило наш бренд в разы, конверсия в покупку первого абонемента выросла.', 
  },
  { 
    name: 'Михаил П.', 
    role: 'Управляющий загородным спа-комплексом', 
    text: 'Gene Perez тонко прочувствовал атмосферу локации. Веб-страница с концептуальным интро стала главным инструментом презентации для премиальных гостей.', 
  }
])

// FAQ
const openFaq = ref(null)
const toggleFaq = (index) => { openFaq.value = openFaq.value === index ? null : index }

const faqs = ref([
  { q: "Что входит в проект?", a: "Мы делаем комплексную работу: от разработки видео-концепта (пре-продакшн, съёмка, режиссура, аэросъёмка) до сборки и программирования индивидуальной интерактивной веб-страницы вашего бренда." },
  { q: "Как видеоинтеграция усиливает бренд?", a: "Вместо статичных картинок гость сразу вовлекается в динамичный кинематографичный экспириенс. Это формирует премиальное ощущение, подчеркивает статус пространства и закрывает вопросы доверия." },
  { q: "Сколько времени занимает весь цикл создания?", a: "В среднем от 3 до 5 недель, включая этап согласования концептов, съёмочные дни, пост-продакшн видео и финализацию веб-разработки." }
])

// Состояние формы заявки
const formName = ref('')
const formContact = ref('')
const formMessage = ref('')
const isSubmitting = ref(false)
const isSuccess = ref(false)

const submitInquiry = async () => {
  isSubmitting.value = true
  // Имитация отправки данных на ваш бэкенд (Brevo, Netlify forms или собственный API)
  setTimeout(() => {
    isSubmitting.value = false
    isSuccess.value = true
    formName.value = ''
    formContact.value = ''
    formMessage.value = ''
    
    setTimeout(() => { isSuccess.value = false }, 5000)
  }, 1200)
}

onMounted(() => {
  // Каскадный запуск анимаций
  setTimeout(() => { isHeaderRevealed.value = true }, 200)      
  setTimeout(() => { isPillRevealed.value = true }, 400)        
  setTimeout(() => { isH1Line1Revealed.value = true }, 600)    
  setTimeout(() => { isH1Line2Revealed.value = true }, 800)    
  setTimeout(() => { isElementsRevealed.value = true }, 1000)   
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap');

:global(html),
:global(body) {
  background-color: #F9F9FB !important;
  color: #111113 !important;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

.font-instrument {
  font-family: 'Instrument Serif', serif;
}

/* Элегантный внутренний бевель и микротени для светлой премиум темы */
.custom-inner-bevel {
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.8),
    0 10px 30px -10px rgba(17, 17, 19, 0.04);
}

/* Плавный скролл */
:global(html) {
  scroll-behavior: smooth;
}

/* Стили reveal-анимации при скролле */
.reveal-init {
  opacity: 0;
  filter: blur(10px);
  transform: translateY(25px) scale(0.99);
  transition: opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1),
              filter 1000ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 1000ms cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-active {
  opacity: 1 !important;
  filter: blur(0px) !important;
  transform: translateY(0px) scale(1) !important;
}

.reveal-line {
  display: inline-block;
  will-change: transform, opacity, filter;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease forward;
}
</style>