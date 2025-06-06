import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    site: group({
      title: 'Site',
      description: 'Site configuration',
      icon: 'ph:info',
      fields: {
        name: field({
          type: 'string',
          title: 'Name',
          description: 'Site name, appearing at the top of your site.',
          icon: 'ph:caret-circle-right',
        }),
        description: field({
          type: 'string',
          title: 'Description',
          description: 'Site description.',
          icon: 'ph:paragraph',
        }),
        url: field({
          type: 'string',
          title: 'URL',
          description: 'Your website\'s canonical URL.',
          icon: 'ph:globe',
        }),
        copyright: field({
          type: 'string',
          title: 'Copyright',
          description: 'Copyright notice appearing in the footer of your website.',
          icon: 'ph:copyright',
        }),
      }
    }),
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
