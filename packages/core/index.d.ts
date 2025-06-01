declare module 'nuxt/schema' {
  interface AppConfigInput {
    nav?: object | boolean
    theme?: string
    backgroundPattern?: string | false
    defaultLayout?: string | null
    ui?: object
  }
}

export {}
