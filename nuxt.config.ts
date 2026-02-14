import { defineNuxtConfig } from 'nuxt/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Gene Perez | Director & Photographer in Toronto',
      meta: [
        { charset: 'utf-8' },
        // КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: Этот тег разрешает скролл и фиксирует масштаб на смартфонах
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
        { name: 'description', content: 'Gene Perez is a Toronto-based director and photographer whose work blends international sensibility with a refined, story-driven aesthetic.' },
        
        { property: 'og:title', content: 'Gene Perez | Director & Photographer in Toronto' },
        { property: 'og:description', content: 'Leading with a Story-First philosophy in Cinematography and Photography.' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },

  components: true,
  css: ['@/assets/css/fonts.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image'
  ],

  image: {
    format: ['webp', 'avif', 'jpeg'],
    quality: 80,
  },

  tailwindcss: { viewer: false },
  vite: { plugins: [tsconfigPaths()] },
  ssr: true 
})