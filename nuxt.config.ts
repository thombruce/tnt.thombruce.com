// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  site: {
    name: 'TNT',
    description: null,
    url: 'https://tnt.thombruce.com',
    copyright: null,
    nav: true,
    backgroundPattern: false,
  },
  routeRules: {
    /* Custom route rules */
    '/docs': { redirect: '/docs/getting-started/installation' },
    '/docs/getting-started': { redirect: '/docs/getting-started/installation' },
  },
  runtimeConfig: {
    public: {
      collections: [
        /* Custom content collections */
        'blog',
        'docs',
      ],
    },
  },
  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
        'neutral',
      ],
    },
  },
  extends: [
    './packages/core',
    './packages/fancy',
    './packages/web',
    './packages/content',
  ],
  modules: [
    /* Custom Modules */
  ],
})
