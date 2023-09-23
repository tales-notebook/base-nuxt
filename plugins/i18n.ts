import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en-US',
    fallbackLocale: 'en-US',
    messages: {
        'en-US': {},
    },
})
export default defineNuxtPlugin(async ({ vueApp }) => {
    // const api = useApi()

    // const data = await api
    //     .get('/api/v1/i18n/en-US')
    //     .then((res) => res.data)
    //     .catch(() => ({}))

    // i18n.global.setLocaleMessage('en-US', data)

    vueApp.use(i18n)
})
