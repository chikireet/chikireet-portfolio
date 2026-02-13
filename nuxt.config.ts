import { defineNuxtConfig } from 'nuxt/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      // The Title is the most important SEO element
      title: 'Gene Perez | Director & Photographer in Toronto',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Gene Perez is a Toronto-based director and photographer whose work blends international sensibility with a refined, story-driven aesthetic. His films and images combine cinematic depth with modern brand storytelling.' },
        // Open Graph for social media sharing
        { property: 'og:title', content: 'Gene Perez | Director & Photographer in Toronto' },
        { property: 'og:description', content: 'Leading with a Story-First philosophy in Cinematography and Photography.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://yourdomain.com' }, 
        { property: 'og:image', content: 'https://yourdomain.com/og-image.jpg' }
      ],
      link: [
        // --- Favicon Pack Start ---
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        // --- Favicon Pack End ---
        
        // Sitemap link for crawlers
        { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }
      ]
    }
  },
  components: true,
  css: ['@/assets/css/fonts.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image' // Модуль для оптимизации изображений
  ],
  // Конфигурация для автоматического сжатия изображений
  image: {
    format: ['webp', 'avif', 'jpeg'], // Конвертация в современные легкие форматы
    quality: 80, // Оптимальный баланс качества и веса
  },
  tailwindcss: { viewer: false },
  vite: { plugins: [tsconfigPaths()] },
  ssr: true // Crucial for Google to read your content
})