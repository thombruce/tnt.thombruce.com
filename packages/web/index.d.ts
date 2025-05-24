declare module 'nuxt/schema' {
  interface AppConfigInput {
    pageFunctions?: (() => void)[]
  }
}

export {}
