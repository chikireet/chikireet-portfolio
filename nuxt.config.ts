import { defineNuxtConfig } from 'nuxt/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      // Updated title to reflect your identity as Gene Perez
      title: 'Gene Perez | Director & Photographer in Toronto',
      meta: [
        { charset: 'utf-8' },
        { name: 'theme-color', content: '#ffc200' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { 
          name: 'viewport', 
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover' 
        },
        { name: 'description', content: 'Yevhen Pereverziev is a Toronto-based director and photographer.' },
        { property: 'og:title', content: 'Yevhen Pereverziev | Director & Photographer in Toronto' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },

  // FIX: Nitro configuration for modern Netlify deployments
  // This resolves the ENOENT server.json error by using the standard preset
  nitro: {
    preset: 'netlify'
  },

  components: true,
  css: ['@/assets/css/fonts.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  
  image: { 
    format: ['webp', 'avif', 'jpeg'], 
    quality: 80 
  },

  vite: { 
    plugins: [tsconfigPaths()],
    build: {
      rollupOptions: {
        // FIX: Lowercase paths to match the 'Previews' folder name on Linux/Netlify
        // These are treated as external so Vite doesn't try to bundle them as JS
        external: [
          '/Previews/chill_your_stress_othership.mp4',
          '/Previews/hyundai_feel_it.mp4',
          '/Previews/jordan.mp4',
          '/Previews/othership_freeze_the_momen.mp4',
          '/Previews/romes_rock_n_roll_is_asleep.mp4',
          '/Previews/rosh_posh_msls.mp4',
          '/Previews/the_phantom.mp4',
          '/Previews/ttc_if_you_see_something_say_something.mp4',
          '/Previews/zhiyun_smooth_x2.mp4'
        ]
      }
    }
  },

  // Keep SSR enabled for better SEO
  ssr: true 
})
