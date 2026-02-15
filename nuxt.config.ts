import { defineNuxtConfig } from 'nuxt/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Gene Perez | Director & Photographer in Toronto',
      meta: [
        { charset: 'utf-8' },
        // Задает цвет интерфейса браузера
        { name: 'theme-color', content: '#ffc200' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        // Делает статус-бар прозрачным для бесшовного вида
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { 
          name: 'viewport', 
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover' 
        },
        { name: 'description', content: 'Gene Perez is a Toronto-based director and photographer.' },
        { property: 'og:title', content: 'Gene Perez | Director & Photographer in Toronto' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },
  components: true,
  css: ['@/assets/css/fonts.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  image: { format: ['webp', 'avif', 'jpeg'], quality: 80 },
  vite: { 
    plugins: [tsconfigPaths()],
    build: {
      rollupOptions: {
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
  ssr: true 
})