// https://nuxt.com/docs/api/configuration/nuxt-config

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import fs from 'fs'

//const fs = require('fs')

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  runtimeConfig: {
    public: {
      collections: [
        'pages',
      ],
      googleAnalytics: {
        // NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=<your-id>
        id: '',
      },
    },
  },
  modules: [
    'nuxt-site-config',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@nuxt/content',
  ],
  css: [
    fs.existsSync('./assets/css/main.css')
      ? './assets/css/main.css'
      : join(currentDir, './assets/css/main.css'),
  ],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  content: {
    build: {
      markdown: {
        toc: {
          // TODO: This can be set back to 2 when we have a better solution for our TntToc
          depth: 1,
        }
      }
    },
    preview: {
      api: 'https://api.nuxt.studio',
      // dev: true,
      // See here for how to debug studio setup in dev: https://content.nuxt.com/docs/studio/debug
      // You probably don't want to do this all the time, as it exposes your app to the internet.
      // It is useful specifically for development work concerning the admin interface on Nuxt Studio.
    }
  },
  i18n: {
    strategy: 'no_prefix',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' }
    ]
  },
  // PATCH: https://github.com/nuxt/nuxt/issues/32175#issuecomment-2898200099
  vite: {
    $server: {
      build: {
        rollupOptions: {
          output: {
            preserveModules: true
          }
        }
      }
    },
  },
})