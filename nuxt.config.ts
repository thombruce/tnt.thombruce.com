// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    static: true
  },
  site: {
    name: 'TNT',
    description: null,
    url: 'https://tnt.thombruce.com',
    copyright: 'Copyright © All rights reserved',
    company: {
      name: 'TNT', // Optional; will fallback to site.name
      email: 'thom@thombruce.com', // TODO: Consider need for separate email used for legal/privacy purposes?
      address: ``, // Optional
      telephone: '', // Optional
      // Consider too whether a named information officer or any other persons ought to be specified.
    },
    ogComponent: 'TntColor',
    og: {
      website: null,
      color: '#e7000b',
      image: null,
    }
  },
  routeRules: {
    /* Custom route rules */
    '/docs': { redirect: '/docs/getting-started/installation' },
    '/docs/getting-started': { redirect: '/docs/getting-started/installation' },
    '/docs/getting-started/installation': { prerender: true },
  },
  runtimeConfig: {
    public: {
      collections: [
        /* Custom content collections */
        'blog',
        'docs',
        'testimonials',
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
    '@thombruce/tnt',
    '@thombruce/tnt-fancy',
    '@thombruce/tnt-web',
    '@thombruce/tnt-content',
  ],
  modules: [
    /* Custom Modules */
  ],
  i18n: {
    // strategy: 'no_prefix',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' }
    ]
  },
})
