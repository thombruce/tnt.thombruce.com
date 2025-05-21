<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts'
import type { PageCollections } from '@nuxt/content'

const route = useRoute()

const { public: { collections } } = useRuntimeConfig()

// TODO: This only ever works if collection is the first part of the URL path.
//       It will match 'blog' in '/blog' but not 'articles' in '/nested/articles'
//       This is... okay. It only indicates that we ought to create custom [...slug].vue
//       components for deeply nested collections. Unfortunately I don't think it is
//       easily solved here unless we iterate over slugs to find the deepest matching
//       collection... but that could yield false positives, so it isn't worth doing at all.
const collection = collections.includes(route.params.slug[0] as keyof PageCollections)
  ? route.params.slug[0] as keyof PageCollections
  : 'pages'

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection(collection).path(route.path).first()
})

const { data: navItems } = await useAsyncData(`tntNav-for-${collection}`, () => {
  return tntNav(true, collection)
  // TODO: Look and see if we can tweak tntNav to allow adjustable start and
  //       end depths.
})

const layout = (page.value?.layout || 'default') as LayoutKey

defineOgImageComponent(page.value?.ogComponent || useSiteConfig().ogComponent || 'TntColor',
  {
    /* TntColor; BrandedLogo, Frame, Nuxt, NuxtSeo, Pergel, SimpleBlog, UnJs, Wave, WithEmoji */
    title: page.value?.og?.title || page.value?.title || null,
    /* Frame, Nuxt, NuxtSeo, Pergel, UnJs */
    description: page.value?.og?.description || page.value?.description || null, // TODO: Not yet used by any ogImage component
    /* Frame, NuxtSeo */
    icon: page.value?.og?.icon || page.value?.icon || null, // TODO: Not yet used by any ogImage component

    /* BrandedLogo, Frame */
    logo: page.value?.og?.logo || null, // TODO: Consider supporting `|| page.value?.logo` - we don't expect every kind of page will need a logo though; this is similar to the testimonial problem
    /* NuxtSeo */
    siteLogo: page.value?.og?.logo || null, // TODO: Consider supporting `|| page.value?.logo` - we don't expect every kind of page will need a logo though; this is similar to the testimonial problem

    /* Nuxt, Pergel */
    headline: page.value?.og?.headline || page.value?.headline || null,
    // TODO: Tempted to add fallback on .description, but Nuxt template uses both - would result in repetition if description set but not headline

    /* TntColor; SimpleBlog */
    website: page.value?.og?.website || null,
    /* TntColor, TntTestimonial */
    color: page.value?.og?.color || null,
    /* TntImage; Frame */
    image: page.value?.og?.image || page.value?.image || null,

    /* NuxtSeo */
    // siteName: null, // NOTE: This is pulled from siteConfig by the NuxtSeo template
    // colorMode: 'dark', // NOTE: This is pulled from runtimeConfig.colorPreference by the NuxtSeo template
    theme: page.value?.og?.color || null, // TODO: Add color from siteConfig here too.

    /* Frame */
    bg: page.value?.og?.bg || null,
    // username, // TODO: This is too specific to implement at this time; revisit.
    // socials, // TODO: This is too specific to implement at this time; revisit.
    
    /* UnJs, WithEmoji */
    emoji: page.value?.og?.emoji || null,
    
    /* UnJs */
    // downloads, // TODO: This is too specific to implement at this time; revisit.
    // stars, // TODO: This is too specific to implement at this time; revisit.
    // contributors, // TODO: This is too specific to implement at this time; revisit.

    /* TntTestimonial */
    testimonial: page.value?.og?.headline || page.value?.headline || null, // NOTE: We reuse headline to avoid having to define a custom .testimonial value used only for this OgImage component
    author: page.value?.author || null,
  }
)
</script>

<template lang="pug">
NuxtLayout(:name="layout" :collection="collection")
  template(#nav)
    UNavigationMenu(:items="navItems || undefined" orientation="vertical" class="")/

  template(#header)
    TntBlogHeader(v-if="page" :page="page")/

  ContentRenderer(
    v-if="page"
    :value="page"
    class="prose \
          dark:prose-invert \
          max-w-none"
  )/

  TntArticleList(
    v-if="page?.list"
    :collection="typeof page.list === 'object' && page.list.collection ? page.list.collection : collection"
    :path=" \
      typeof page.list === 'boolean' \
        ? route.path \
        : typeof page.list === 'string' \
        ? page.list \
        : typeof page.list === 'object' \
        ? page.list.path \
        : route.path \
    "
    :order="typeof page.list === 'object' && page.list.order ? page.list.order : undefined"
  )

  template(#toc)
    TntToc(:toc="page?.body.toc")
</template>
