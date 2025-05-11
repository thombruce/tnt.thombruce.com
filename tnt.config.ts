import type { NavigationMenuItem } from "@nuxt/ui"

const config = {
  /* Site Config */
  site: {
    name: 'TNT',
    description: null,
    url: 'https://tnt.thombruce.com',
    copyright: null,
    defaultLocale: 'en',
    nav: true,
    backgroundPattern: false,
  },

  /* Route Rules */
  routeRules: {
    /* Custom route rules */
    '/docs': { redirect: '/docs/getting-started/installation' },
    '/docs/getting-started': { redirect: '/docs/getting-started/installation' },
  }
} as TntConfig

export const siteConfig = config.site
export const routeRules = config.routeRules

/* TYPES */
type TntConfig = {
  site: SiteConfig,
  routeRules?: RouteRules
}

type SiteConfig = {
  name: string | null,
  description: string | null,
  url: string | null,
  copyright: string | null,
  defaultLocale: string,
  nav: NavigationMenuItem[] | boolean,
  backgroundPattern?: string | false | null,
}

type RouteRules = {
  [k: string]: {
    redirect?: string,
    ssr?: boolean,
    cors?: boolean,
    headers?: object,
    swr?: number | boolean,
    isr?: number | boolean,
    prerender?: boolean,
    noScripts?: boolean,
    appMiddleware?: string | string[] | Record<string, boolean>,
  }
}
