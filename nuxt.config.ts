import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/image'],
  css: [join(currentDir, './assets/css/tailwind.css'), join(currentDir, './assets/css/main.css')],
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
