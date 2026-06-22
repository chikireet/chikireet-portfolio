<template>
  <div class="case-othership">
    <section ref="gridSection" class="posts-grid" :class="{ 'is-visible': isGridVisible }">
      <div 
        v-for="(post, index) in posts" 
        :key="index"
        class="post-card"
        :style="getPostStyle(index)"
      >
        <div class="post-content">
          <span class="post-index">#{{ index + 1 }}</span>
        </div>
      </div>
    </section>

    <footer class="portfolio-footer">
      <div class="social-links">
        <a href="https://chikireet.com" target="_blank" rel="noopener" class="social-link" title="Website">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span class="link-text">chikireet.com</span>
        </a>

        <a href="https://www.instagram.com/chikireet/" target="_blank" rel="noopener" class="social-link" title="Instagram">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <span class="link-text">@chikireet</span>
        </a>

        <a href="mailto:gene@chikireet.com" class="social-link" title="Email Me">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span class="link-text">gene@chikireet.com</span>
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'CaseOthership',
  data() {
    return {
      isGridVisible: false,
      // Массив для демонстрации 6 карточек (замените на ваши реальные данные, если необходимо)
      posts: Array.from({ length: 6 }), 
      observer: null
    };
  },
  mounted() {
    // Настройка Intersection Observer для фикса слишком раннего срабатывания
    const options = {
      root: null, 
      // Отступ снизу -15%, чтобы анимация триггерилась, когда сетка зайдет глубже во вьюпорт
      rootMargin: '0px 0px -15% 0px', 
      // Элемент считается пересеченным, когда видно хотя бы 20% его площади
      threshold: 0.2
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Дополнительная задержка в 400мс, чтобы пользователь гарантированно успел доскроллить
          setTimeout(() => {
            this.isGridVisible = true;
          }, 400);
          
          // Отписываемся от слежки, чтобы анимация сработала один раз
          if (this.observer) this.observer.unobserve(entry.target);
        }
      });
    }, options);

    if (this.$refs.gridSection) {
      this.observer.observe(this.$refs.gridSection);
    }
  },
  beforeDestroy() {
    if (this.observer && this.$refs.gridSection) {
      this.observer.unobserve(this.$refs.gridSection);
    }
  },
  methods: {
    // Рассчет staggered-задержки появления для каждой карточки
    getPostStyle(index) {
      const baseDelay = 0.25; // Стартовая задержка после активации .is-visible
      const cascadeStep = index * 0.15; // Пошаговый сдвиг для каскада
      const randomOffset = Math.random() * 0.08; // Легкий рандом для "живого" эффекта
      
      return {
        '--animation-delay': `${baseDelay + cascadeStep + randomOffset}s`
      };
    }
  }
};
</script>

<style scoped>
/* Стили сетки постов */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 60px 20px;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Класс, добавляемый наблюдателем при скролле */
.posts-grid.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Карточки постов (Reels) */
.post-card {
  background: #111; /* Кинематографичный темный фон */
  border: 1px solid #222;
  aspect-ratio: 9 / 16; /* Пропорции Reels видео */
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  
  /* Начальное состояние до анимации */
  opacity: 0;
  transform: scale(0.94) translateY(30px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), 
              transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--animation-delay, 0s);
}

/* Запуск анимации карточек при активации сетки */
.posts-grid.is-visible .post-card {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* Стили для внутренней разметки карточки */
.post-content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
}

.post-index {
  color: #555;
  font-family: monospace;
  font-size: 12px;
}

/* Нижний блок (Футер) */
.portfolio-footer {
  padding: 60px 20px;
  border-top: 1px solid #1a1a1a;
  background: #0a0a0a;
}

.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  color: #888;
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #ffffff; /* Белый акцент при наведении */
}

.icon {
  width: 18px;
  height: 18px;
  margin-right: 10px;
  stroke-width: 1.5px;
}

.link-text {
  font-weight: 400;
}

/* Адаптивность для мобильных */
@media (max-width: 600px) {
  .social-links {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    max-widh: fit-content;
    margin: 0 auto;
  }
}
</style>