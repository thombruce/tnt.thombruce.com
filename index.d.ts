declare module 'nuxt/schema' {
  interface AppConfigInput {
    site?: { copyright?: string }
    nav?: object | boolean
    theme?: string | null
    backgroundPattern?: string | false
    defaultLayout?: string | null
    ui?: object
    og?: object
    ogComponent?: string
  }
}

export {}
