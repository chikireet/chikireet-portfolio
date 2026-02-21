import { defineNuxtConfig } from 'nuxt/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  // SITE CONFIGURATION: Essential for @nuxtjs/sitemap
  site: {
    url: 'https://chikireet.com',
    name: 'Gene Perez | Director & Photographer',
  },

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
        { property: 'og:type', content: 'website' },
        // Ensure OG image uses the full domain for iMessage/Social previews
        { property: 'og:image', content: 'https://chikireet.com/share-preview.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },

  nitro: {
    preset: 'vercel'
  },

  components: true,
  css: ['@/assets/css/fonts.css'],
  
  modules: [
    '@nuxtjs/tailwindcss', 
    '@nuxt/image',
    '@nuxtjs/sitemap', // Added for SEO
    '@nuxtjs/robots'   // Added for SEO
  ],

  // ROBOTS CONFIGURATION
  robots: {
    rules: [
      { UserAgent: '*' },
      { Allow: '/' },
      { Sitemap: 'https://chikireet.com/sitemap.xml' }
    ]
  },
  
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

  ssr: true 
})
