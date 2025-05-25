// Four options:
// 1. Pass an args instead with type: { component: String, title: String, description: String, ... }
// 2. Pass individual arguments like: (component: String, title: String, description: String, ...)
// 3. Some combo like: (component: String, args: { title: String, description: String, ... })
// 4. Fully move this back to TNT Content and maintain page: PagesCollectionItem

// I don't like option 4.
// I think option 3 makes the most sense, handling component separately to the arguments which will
// be passed to the component.

export const tntOgImageComponent = (
  component?: string,
  props?: {
    title?: string,
    description?: string,
    icon?: string,
    logo?: string,
    siteLogo?: string,
    headline?: string,
    website?: string,
    color?: string,
    image?: string,
    theme?: string,
    bg?: string,
    emoji?: string,
    testimonial?: string,
    author?: { name: string, title?: string, avatar?: { src: string }, to?: string },
  }
) => {
  return defineOgImageComponent(component || useSiteConfig().ogComponent || 'TntColor',
    {
      /* TntColor; BrandedLogo, Frame, Nuxt, NuxtSeo, Pergel, SimpleBlog, UnJs, Wave, WithEmoji */
      title: props?.title || null,
      /* Frame, Nuxt, NuxtSeo, Pergel, UnJs */
      description: props?.description || null, // TODO: Not yet used by any ogImage component
      /* Frame, NuxtSeo */
      icon: props?.icon || null, // TODO: Not yet used by any ogImage component

      /* BrandedLogo, Frame */
      logo: props?.logo || props?.siteLogo || null, // TODO: Consider supporting `|| page?.logo` - we don't expect every kind of page will need a logo though; this is similar to the testimonial problem
      /* NuxtSeo */
      siteLogo: props?.siteLogo || props?.logo || null, // TODO: Consider supporting `|| page?.logo` - we don't expect every kind of page will need a logo though; this is similar to the testimonial problem

      /* Nuxt, Pergel */
      headline: props?.headline || null,
      // TODO: Tempted to add fallback on .description, but Nuxt template uses both - would result in repetition if description set but not headline

      /* TntColor; SimpleBlog */
      website: props?.website || null,
      /* TntColor, TntTestimonial */
      color: props?.color || props?.theme || null,
      /* TntImage; Frame */
      image: props?.image || null,

      /* NuxtSeo */
      // siteName: null, // NOTE: This is pulled from siteConfig by the NuxtSeo template
      // colorMode: 'dark', // NOTE: This is pulled from runtimeConfig.colorPreference by the NuxtSeo template
      theme: props?.theme || props?.color || null, // TODO: Add color from siteConfig here too.

      /* Frame */
      bg: props?.bg || null,
      // username, // TODO: This is too specific to implement at this time; revisit.
      // socials, // TODO: This is too specific to implement at this time; revisit.
      
      /* UnJs, WithEmoji */
      emoji: props?.emoji || null,
      
      /* UnJs */
      // downloads, // TODO: This is too specific to implement at this time; revisit.
      // stars, // TODO: This is too specific to implement at this time; revisit.
      // contributors, // TODO: This is too specific to implement at this time; revisit.

      /* TntTestimonial */
      testimonial: props?.testimonial || props?.headline || null, // NOTE: We reuse headline to avoid having to define a custom .testimonial value used only for this OgImage component
      author: props?.author || null,
    }
  )
}