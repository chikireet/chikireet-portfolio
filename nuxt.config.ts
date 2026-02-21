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
      ],
      // META PIXEL INTEGRATION
      script: [
        {
          children: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '27066338849635015');
            fbq('track', 'PageView');
          `,
          type: 'text/javascript'
        }
      ],
      noscript: [
        {
          children: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=27066338849635015&ev=PageView&noscript=1"/>`
        }
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

  ssm: true 
})
