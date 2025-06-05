import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    parent: group({
      title: 'Theme',
      description: 'Theme configuration',
      icon: 'i-ph-palette-fill',
      fields: {
        backgroundPattern: field({
          type: 'string',
          title: 'Background Pattern',
          description: 'Background pattern used across your site.',
          icon: 'i-ph-palette',
          default: false, // TODO: false isn't a string; assess whether behaviour is correct and amend this/app.config
          required: ['jigsaw', 'overcast', 'formal invitation', 'topography', 'texture', 'i like food', 'bubbles', 'floating cogs', 'glamorous', 'circuit board']
        })
      }
    })
  }
})
