// https://nuxt.com/docs/api/configuration/nuxt-config
import { createPinia } from 'pinia'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',///compatibilidad referente a las ultima version 
  ssr:false,
  spaLoadingTemplate: './spa-loading-template.html',
  components: true,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-headlessui', 'nuxt-toastify'],
  plugins: [
    { src: '@/plugins/pinia-plugin.js' }
  ],
  headlessui: {
    prefix: 'Headless'
  },
  build: {
    transpile: ['lucide-vue-next','vue-toastification']
  },
  components: [
    '~/components' // Suponiendo que tu componente está en la carpeta components
  ],
  
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  }
})