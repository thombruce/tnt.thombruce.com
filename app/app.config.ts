export default defineAppConfig({
  site: {
    name: 'TNT',
    description: 'A dynamite Nuxt template!',
    url: 'https://tnt.thombruce.com/',
    og: {
      component: 'TntColor',
      website: 'tnt.thombruce.com',
      color: '#e7000b',
      // image: null, // NOTE: Removed as broken. / TODO: Investigate
    },
  },
  // @i18n
  content: {
    i18n: false,
  },
  ui: {
    layout: 'default',
    theme: 'solid',
    pattern: 'circuit board',
    colors: {
      primary: 'red',
      secondary: 'blue',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'slate',
    }
  },
  og: {
    website: null,
    color: '#e7000b',
    image: null,
  },
  header: {
    navigation: {
      content: false,
      links: [
        { label: 'Home', icon: 'i-lucide:house', to: '/' },
        {
          label: 'Docs',
          icon: 'i-lucide:book',
          to: '/docs',
          // TODO: Mod TNT to allow `children: true` and automatically populate? Is this possible? How would TNT know what collection to look in? What path to use? (Path as above?)
          //       It would save on a lot of (right now) necessary duplication of icon: and description: values...
          //       These are used elsewhere too, and we would prefer not to have to update them both places each time.
          children: [
            { label: 'Getting Started', description: 'How to install and configure TNT for your own purposes.', icon: 'i-lucide:play', to: '/docs/getting-started' },
            { label: 'Features', description: 'All the features that make TNT great.', icon: 'i-lucide:star', to: '/docs/features' },
            { label: 'Components', description: 'All of the components provided by TNT and our integrations.', icon: 'i-lucide:cog', to: '/docs/components' },
            { label: 'Composables', description: 'Reusable composables for advanced functionality.', icon: 'i-lucide:boxes', to: '/docs/composables' },
          ]
        },
        { label: 'Blog', icon: 'i-lucide:pen', to: '/blog' },
        {
          label: 'About',
          icon: 'i-lucide:info',
          to: '/about',
          children: [
            { label: 'About TNT', description: 'How and why TNT exists', icon: 'i-lucide:info', to: '/about' },
            { label: 'Testimonials', description: 'What are people saying about TNT?', icon: 'i-lucide:message-square-heart', to: '/testimonials' },
            { label: 'Cookies', description: 'How we use cookies', icon: 'i-lucide:cookie', to: '/cookie-policy' },
          ],
        },
      ],
    }
  },
  footer: {
    about: '',
    contact: {
      email: '',
      tel: '',
      address: '',
    },
    copyright: 'Copyright © All rights reserved',
    navigation: {
      content: true,
      links: [],
    }
  },
})