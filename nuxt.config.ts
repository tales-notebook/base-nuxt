// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/image'],
  css: [resolve('assets/css/tailwind.css'), resolve('assets/css/main.css')],
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
