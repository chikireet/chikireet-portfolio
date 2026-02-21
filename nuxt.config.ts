import { defineNuxtConfig } from 'nuxt/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Gene Perez | Director & Photographer',
      meta: [
        { charset: 'utf-8' },
        { name: 'theme-color', content: '#ffc200' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { 
          name: 'viewport', 
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover' 
        },
        { name: 'description', content: 'Award-winning visual storytelling and cinematic photography for global brands, based in Toronto.' },
        { property: 'og:title', content: 'Gene Perez – Director & Photographer | Toronto' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },

  // Updated for Vercel deployment
  nitro: {
    preset: 'vercel'
  },

  components: true,
  css: ['@/assets/css/fonts.css'],
  
  // FIX: Added @vercel/speed-insights/nuxt to the modules array
  modules: [
    '@nuxtjs/tailwindcss', 
    '@nuxt/image', 
  ],
  
  image: { 
    format: ['webp', 'avif', 'jpeg'], 
    quality: 80 
  },

  vite: {
    plugins: [tsconfigPaths()],
    build: {
      rollupOptions: {
        external: [] 
      }
    }
  },

  // Keep SSR enabled for better SEO
  ssr: true 
})
