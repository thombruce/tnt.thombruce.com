import type { PagesCollectionItem } from '@nuxt/content'

export const tntOgImageComponent = (page?: PagesCollectionItem | null) => {
  return defineOgImageComponent(page?.ogComponent || useSiteConfig().ogComponent || 'TntColor',
    {
      /* TntColor; BrandedLogo, Frame, Nuxt, NuxtSeo, Pergel, SimpleBlog, UnJs, Wave, WithEmoji */
      title: page?.og?.title || page?.title || null,
      /* Frame, Nuxt, NuxtSeo, Pergel, UnJs */
      description: page?.og?.description || page?.description || null, // TODO: Not yet used by any ogImage component
      /* Frame, NuxtSeo */
      icon: page?.og?.icon || page?.icon || null, // TODO: Not yet used by any ogImage component

      /* BrandedLogo, Frame */
      logo: page?.og?.logo || null, // TODO: Consider supporting `|| page?.logo` - we don't expect every kind of page will need a logo though; this is similar to the testimonial problem
      /* NuxtSeo */
      siteLogo: page?.og?.logo || null, // TODO: Consider supporting `|| page?.logo` - we don't expect every kind of page will need a logo though; this is similar to the testimonial problem

      /* Nuxt, Pergel */
      headline: page?.og?.headline || page?.headline || null,
      // TODO: Tempted to add fallback on .description, but Nuxt template uses both - would result in repetition if description set but not headline

      /* TntColor; SimpleBlog */
      website: page?.og?.website || null,
      /* TntColor, TntTestimonial */
      color: page?.og?.color || null,
      /* TntImage; Frame */
      image: page?.og?.image || page?.image || null,

      /* NuxtSeo */
      // siteName: null, // NOTE: This is pulled from siteConfig by the NuxtSeo template
      // colorMode: 'dark', // NOTE: This is pulled from runtimeConfig.colorPreference by the NuxtSeo template
      theme: page?.og?.color || null, // TODO: Add color from siteConfig here too.

      /* Frame */
      bg: page?.og?.bg || null,
      // username, // TODO: This is too specific to implement at this time; revisit.
      // socials, // TODO: This is too specific to implement at this time; revisit.
      
      /* UnJs, WithEmoji */
      emoji: page?.og?.emoji || null,
      
      /* UnJs */
      // downloads, // TODO: This is too specific to implement at this time; revisit.
      // stars, // TODO: This is too specific to implement at this time; revisit.
      // contributors, // TODO: This is too specific to implement at this time; revisit.

      /* TntTestimonial */
      testimonial: page?.og?.headline || page?.headline || null, // NOTE: We reuse headline to avoid having to define a custom .testimonial value used only for this OgImage component
      author: page?.author || null,
    }
  )
}