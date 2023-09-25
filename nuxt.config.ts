export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/image'],
  css: ['./assets/css/tailwind.css', './assets/css/main.css'],
  vue: {
    defineModel: true
  },
  imports: {
    presets: [
        {
            from: 'vue-i18n',
            imports: ['useI18n'],
        },
    ],
  },
})
