<template>
  <div class="landing-container">
    <canvas ref="starCanvas" class="star-canvas"></canvas>

    <div class="badge animate-reveal" style="animation-delay: 350ms">
      <span class="pulse-dot"></span>
      <span>Waitlist • Launching June 10th</span>
    </div>

    <main class="content">
      <h1 class="main-title animate-reveal" style="animation-delay: 600ms">
        Hollywood color comes <br />
        <span class="italic-serif">straight from your iPhone.</span>
      </h1>
      
      <p class="subtitle animate-reveal" style="animation-delay: 850ms">
        Join the waitlist to secure early access and an 
        <strong style="color: #ffffff; font-weight: 500;">exclusive 20% discount</strong> for the STARFORCE LUTS pack.
      </p>

      <div class="form-wrapper animate-reveal" style="animation-delay: 1100ms">
        <transition name="fade" mode="out-in">
          
          <div v-if="waitlistSuccess" class="status-card success" key="success">
            <div class="status-header">
              <svg class="status-icon success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>You're on the list.</span>
            </div>
            <span class="status-text">Check your inbox for the exclusive promo code.</span>
          </div>

          <div v-else-if="errorMessage" class="status-card error" key="error">
            <div class="status-header">
              <svg class="status-icon error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Oops!</span>
            </div>
            <span class="status-text">{{ errorMessage }}</span>
            <button @click="resetForm" class="submit-btn try-again-btn">
              Try Again
            </button>
          </div>

          <form 
            v-else 
            @submit.prevent="submitWaitlist" 
            class="input-group"
            key="form"
          >
            <input 
              v-model="email" 
              type="email" 
              placeholder="Your Email Address" 
              required
              :disabled="isSubmitting"
              class="email-input"
            />
            <button 
              type="submit" 
              class="submit-btn"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Joining...' : 'Get Notified' }}
            </button>
          </form>

        </transition>
      </div>
    </main>

    <div class="planet-horizon">
      <div class="atmosphere-glow"></div>
      <div class="planet-surface"></div>
    </div>

    <div class="footer-credit animate-reveal" style="animation-delay: 1350ms">
      <span class="credit-text">Created by</span>
      <a href="https://chikireet.com/" class="credit-link">
        <img src="/logo.svg" alt="Chikireet" class="footer-logo" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useHead } from '#imports'; 

useHead({
  title: 'Waitlist | STARFORCE LUTS',
  link: [
    { 
      rel: 'icon', 
      type: 'image/png', 
      href: '/landing-favicon.png' 
    }
  ],
  meta: [
    { name: 'theme-color', content: '#0a0a0a' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
  ]
});

const email = ref('');
const isSubmitting = ref(false);
const waitlistSuccess = ref(false);
const errorMessage = ref(''); // Новая переменная для хранения ошибки

const submitWaitlist = async () => {
  if (!email.value) return;
  isSubmitting.value = true;
  errorMessage.value = ''; // Сбрасываем прошлую ошибку перед новым запросом
  
  try {
    const response = await $fetch('/api/subscribe', {
      method: 'POST',
      body: {
        email: email.value,
        name: 'Waitlist Member',
        listId: 7 
      }
    });

    if (response.success) {
      waitlistSuccess.value = true;
    } else {
      console.error('Brevo API error:', response.error);
      errorMessage.value = 'Something went wrong on our end. Please try again.';
    }
  } catch (error) {
    console.error('Network or Server Error:', error);
    errorMessage.value = 'Network error. Please check your connection and try again.';
  } finally {
    isSubmitting.value = false;
  }
};

// Функция для возврата к форме после ошибки
const resetForm = () => {
  errorMessage.value = '';
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
    
    const starCount = window.innerWidth < 768 ? 600 : 1800;
    
    stars = Array.from({ length: starCount }, () => {
      const sizeRandom = Math.random();
      let baseSize;
      let type;
      
      if (sizeRandom > 0.98) {
        baseSize = Math.random() * 1.2 + 0.7; 
        type = 'active';
      } else if (sizeRandom > 0.80) {
        baseSize = Math.random() * 0.55 + 0.35; 
        type = 'normal';
      } else {
        baseSize = Math.random() * 0.25 + 0.2; 
        type = 'background';
      }
      
      return {
        x: Math.random() * canvas.width, 
        y: Math.random() * canvas.height,
        radius: baseSize, 
        type: type,
        vx: (Math.random() - 0.5) * 0.08, 
        vy: (Math.random() - 0.5) * 0.08,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        alpha: Math.random() * 0.3 + 0.7, 
        targetAlpha: Math.random() * 0.3 + 0.7,
        twinkleSpeed: type === 'background' ? 0.002 : (Math.random() * 0.02 + 0.01),
      };
    });
  };

  const renderStars = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      star.x += star.vx;
      star.y += star.vy;

      if (star.x < 0) star.x = canvas.width;
      if (star.x > canvas.width) star.x = 0;
      if (star.y < 0) star.y = canvas.height;
      if (star.y > canvas.height) star.y = 0;

      if (star.type !== 'background') {
        if (Math.abs(star.alpha - star.targetAlpha) < 0.01) {
          const minA = star.type === 'active' ? 0.3 : 0.5;
          star.targetAlpha = Math.random() * (1.0 - minA) + minA;
        } else {
          star.alpha += (star.targetAlpha - star.alpha) * star.twinkleSpeed;
        }
      } else {
        star.alpha = Math.random() * 0.1 + 0.85; 
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.globalAlpha = Math.max(0.1, Math.min(1.0, star.alpha));
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

<script>
export default {
  inheritAttrs: false
}
</script>

<style>
/* Глобальные стили */
html, body, #__nuxt, #app {
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
  height: 100%;
  background-color: #0a0a0a !important;
  overscroll-behavior: none;
  overflow-x: hidden !important;
}
</style>

<style scoped>
/* ОБЩИЕ СТИЛИ КОНТЕЙНЕРА */
.landing-container {
  min-height: 100vh;
  min-height: 100dvh;
  background-color: #0a0a0a;
  color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 7vh; 
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  text-align: center;
}

/* ЗВЕЗДНЫЙ ФОН */
.star-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

/* БЭДЖ СВЕРХУ */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 11px;
  text-transform: uppercase;
  font-family: monospace;
  font-weight: 500;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: clamp(24px, 5vw, 40px);
  z-index: 10;
  position: relative;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 0 8px #ffffff;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: all 0.3s ease;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .4; }
}

/* КОНТЕНТНАЯ ЗОНА */
.content {
  z-index: 10;
  position: relative;
  max-width: 680px;
  padding: 0 20px;
  width: 100%;
}

/* ЗАГОЛОВОК */
.main-title {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: clamp(34px, 7vw, 60px);
  line-height: 1.1;
  letter-spacing: -3px;
  color: #f0f0f0;
  margin: 0 0 clamp(16px, 3vw, 24px) 0;
}

.italic-serif {
  font-family: 'Instrument Serif', serif;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0px; 
  color: #d4d4d4;
}

/* ПОДЗАГОЛОВОК */
.subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(14px, 2.5vw, 16px);
  line-height: 1.6;
  letter-spacing: -0.4px;
  color: rgba(255, 255, 255, 0.56); 
  max-width: 480px; 
  margin: 0 auto clamp(24px, 5vw, 40px) auto;
}

/* ФОРМА И КАРТОЧКИ СТАТУСА */
.form-wrapper {
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  min-height: 60px; /* Чтобы не прыгала высота */
}

/* Стиль формы */
.input-group {
  display: flex;
  align-items: center; 
  background: rgba(10, 10, 14, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 6px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

.input-group:focus-within {
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.03);
  background: rgba(13, 13, 18, 0.8);
}

.email-input {
  flex: 1;
  min-width: 0; 
  background: transparent;
  border: none;
  padding: 12px 16px;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  width: 100%;
}

.email-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.submit-btn {
  background: #f0f0f0;
  color: #0a0a0a;
  border: none;
  padding: 0 22px;
  height: 48px; 
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.submit-btn:hover:not(:disabled) {
  background: #ffffff;
}

.submit-btn:active:not(:disabled) {
  transform: scale(0.97);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Единый стиль для окон Успеха и Ошибки */
.status-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  /* Идентичный стеклянный фон с формой */
  background: rgba(10, 10, 14, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08); 
  
  padding: 24px;
  border-radius: 12px;
  color: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  width: 100%;
}

.status-card.success {
  border-color: rgba(74, 222, 128, 0.2); /* Едва заметный зеленый оттенок */
}

.status-card.error {
  border-color: rgba(248, 113, 113, 0.2); /* Едва заметный красный оттенок */
}

.status-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 16px;
}

.status-icon {
  width: 20px;
  height: 20px;
}

.success-icon {
  color: #4ade80;
}

.error-icon {
  color: #f87171;
}

.status-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.56);
  text-align: center;
  line-height: 1.5;
}

/* Кнопка возврата в окне ошибки */
.try-again-btn {
  margin-top: 12px;
  height: 40px; /* Чуть меньше основной, чтобы не утяжелять карточку */
  padding: 0 20px;
  font-size: 13px;
}

/* ЭФФЕКТ ПЛАНЕТЫ И ПЛАВНАЯ СМЕНА ЦВЕТА */
.planet-horizon {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
  transition: bottom 0.4s ease;
}

.atmosphere-glow {
  position: absolute;
  top: -10%;
  width: 60%;
  height: 60%;
  background: radial-gradient(
    circle, 
    rgba(71, 143, 148, 0.45) 0%, 
    rgba(34, 76, 88, 0.15) 50%, 
    rgba(0,0,0,0) 100%
  );
  animation: colorCycle 25s infinite linear;
}

@keyframes colorCycle {
  0% { filter: blur(80px) hue-rotate(0deg); }
  100% { filter: blur(80px) hue-rotate(360deg); }
}

.planet-surface {
  position: absolute;
  bottom: -140vw;
  width: 150vw;
  height: 150vw;
  background: #060606;
  border-radius: 50%;
  box-shadow: 0px -2px 30px rgba(134, 199, 204, 0.25), 
              inset 0px 10px 40px rgba(255, 255, 255, 0.03);
  animation: shadowColorCycle 25s infinite linear;
}

@keyframes shadowColorCycle {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}

/* ФУТЕР (АВТОР) */
.footer-credit {
  position: absolute;
  bottom: 6vh; 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px; 
  z-index: 10;
}

.credit-text {
  font-size: 7px; 
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.4);
  font-family: monospace;
  font-weight: 700;
}

.credit-link {
  opacity: 0.5;
  transition: opacity 0.5s ease;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
}

.credit-link:hover {
  opacity: 1;
}

.footer-logo {
  height: 32px; 
  width: auto;
  pointer-events: none;
  filter: brightness(1.8) contrast(1.2);
}

/* АНИМАЦИИ */
.animate-reveal {
  opacity: 0;
  animation: revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes revealUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* АДАПТИВНОСТЬ ДЛЯ МОБИЛЬНЫХ ЭКРАНОВ */
@media (max-width: 600px) {
  .planet-horizon {
    bottom: 10vh; 
  }
  
  .badge {
    padding: 4px 8px;
    font-size: 8px;
    gap: 5px;
    margin-bottom: 20px;
  }
  
  .pulse-dot {
    width: 4px;
    height: 4px;
  }

  .main-title {
    letter-spacing: -1.5px; 
  }

  .subtitle {
    max-width: 320px; 
  }
  
  .form-wrapper {
    max-width: 300px;
  }

  .input-group {
    padding: 4px;
    height: 52px; 
  }

  .email-input {
    padding: 8px 12px;
    font-size: 13px;
  }

  .submit-btn {
    padding: 0 16px;
    height: 44px;
    font-size: 13px;
  }

  .credit-text {
    font-size: 5px; 
    letter-spacing: 1.5px;
  }

  .footer-logo {
    height: 22px; 
  }
}
</style>