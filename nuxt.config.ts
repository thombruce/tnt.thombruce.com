// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  site: {
    name: 'TNT',
    description: null,
    url: 'https://tnt.thombruce.com',
    copyright: 'Copyright © All rights reserved',
    nav: [
      { label: 'Home', icon: 'i-lucide:house', to: '/' },
      { label: 'Docs', icon: 'i-lucide:book', to: '/docs' },
      { label: 'Blog', icon: 'i-lucide:pen', to: '/blog' },
      {
        label: 'About',
        icon: 'i-lucide:info',
        to: '/about',
        children: [
          { label: 'About TNT', description: 'How and why TNT exists', icon: 'i-lucide:info', to: '/about' },
          { label: 'Testimonials', description: 'What are people saying about TNT?', icon: 'i-lucide:message-square-heart', to: '/testimonials' },
        ],
      },
    ],
    backgroundPattern: false,
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
})
