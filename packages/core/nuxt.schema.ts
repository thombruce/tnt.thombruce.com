import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    theme: group({
      title: 'Theme',
      description: 'Theme configuration',
      icon: 'ph:palette-fill',
      fields: {
        defaultLayout: field({
          type: 'string',
          title: 'Default Layout',
          description: 'The layout to be used for your pages if no other value is provided.',
          icon: 'ph:layout',
          default: 'default',
          required: ['default', 'headerless', 'article', 'doc', 'empty']
        })
      }
    })
  }
})
