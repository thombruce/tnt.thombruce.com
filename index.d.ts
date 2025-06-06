declare module 'nuxt/schema' {
  interface AppConfigInput {
    site?: { name?: string, description?: string, url?: string, copyright?: string }
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
