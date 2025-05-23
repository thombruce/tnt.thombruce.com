// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  runtimeConfig: {
    public: {
      layers: [
        'tnt-web'
      ],
      googleAnalytics: {
        // NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=<your-id>
        id: '',
      },
    },
  },
  modules: [
    '@nuxtjs/seo',
  ],
})

// TODO:
// 1. Cookie notice and consent
// 2. Analytics tokens (active only after consent)
//    i. Google [done]
//    ii. Umami? And other analytics options
// 3. Enable cookies to be used without requiring the consent mechanism
//    It's strictly only needed in GDPR-covered regions and... California, I think? Others.
