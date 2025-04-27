// https://nuxt.com/docs/api/configuration/nuxt-config

import { siteConfig, routeRules } from './tnt.config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  extends: [
    './packages/core',
    './packages/fancy',
    './packages/content',
  ],
  modules: [
    /* Custom Modules */
  ],
  site: {
    name: siteConfig.name || 'TNT',
    description: siteConfig.description || 'Welcome to TNT!',
    url: siteConfig.url || 'https://example.com/',
    copyright: siteConfig.copyright || 'Copyright © All rights reserved',
    nav: siteConfig.nav || false,
    backgroundPattern: siteConfig.backgroundPattern || false,
  },
  routeRules: {
    ...routeRules,
  },
})
