<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts'
import type { PageCollections } from '@nuxt/content'

const route = useRoute()

const { public: { collections } } = useRuntimeConfig()

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

defineOgImageComponent(page.value?.og?.component || useSiteConfig().og?.component || 'TntColor',
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

    // TODO: We must figure out how testimonial ought to be expected to be passed
    //       from a page to our component. It is strictly a kind of weird idea to
    //       have like... single-testimonial pages that might have properties like
    //       testimonial text and author defined. But... it is handy to have that
    //       component exist and therefore to enable the passing of those properties
    //       here? Hmm... but such properties should not be defined on all pages for
    //       general purposes. We are going to need to have distinct pages for certain
    //       collections that enable the overriding of how defineOgImageComponent works.
    //
    // We should in that case also consider whether any more of the actual structure
    // of the pages represented by this document can be moved into the reusable layout
    // documents.
    //
    // For now, we leave TntTestimonial functionality as an exercise for the future with
    // these considerations still to be made.

    // TODO: Should testimonial also be an object having text and author parts?
    //       But author is otherwise already well-defined separately 🤔
    // testimonial: null, // TODO: Not yet used by any ogImage component
    // author: null, // TODO: Not yet used by any ogImage component
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
