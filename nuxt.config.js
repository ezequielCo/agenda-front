// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',///compatibilidad referente a las ultima version 
  ssr:false,

  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui'
  ],
  headlessui: {
    prefix: 'Headless'
  },
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
