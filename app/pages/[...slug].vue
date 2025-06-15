<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts'
import type { PageCollections } from '@nuxt/content'

const route = useRoute()

const { public: { collections } } = useRuntimeConfig()

const { ui: { theme, layout: defaultLayout, pattern: backgroundPattern } } = useAppConfig()

const collection = collections.includes(route.params.slug[0] as keyof PageCollections)
  ? route.params.slug[0] as keyof PageCollections
  : 'pages'

// NOTE: useAsyncData removed
const page = await queryCollection(collection).path(route.path).first()

// NOTE: useAsyncData removed
const navItems = await tntNav(true, collection)

const layout = (page?.layout || defaultLayout || 'default') as LayoutKey

definePageMeta({
  colorMode: pageMeta.colorMode
})

tntOgImageComponent(page?.og?.component, {
  title: page?.og?.title || page?.title,
  // description: page?.og?.description || page?.description,
  // icon: page?.og?.icon || page?.icon,
  // logo: page?.og?.logo,
  // siteLogo: page?.og?.siteLogo,
  // headline: page?.og?.headline || page?.headline, // TODO: headline removed - but we don't use this in our own OG Image components anyhow
  website: page?.og?.website,
  color: page?.og?.color,
  // image: page?.og?.image || page?.image,
  // theme: page?.og?.theme,
  // bg: page?.og?.bg,
  // emoji: page?.og?.emoji,
  // TODO: headline replaced with description below, as we're simplifying the schema...
  //       Revisit with a more robust approach in future.
  testimonial: page?.og?.description || page?.description,
  authors: page?.authors,
})
</script>

<template lang="pug">
NuxtLayout(:name="layout" :theme="theme" :collection="collection")
  template(#nav v-if="page?.nav && navItems")
    UNavigationMenu(
      :items="navItems"
      orientation="vertical"
      :unmount-on-hide="false"
    )/

  //- template(#header)
  //-   TODO: We're presently duplicating title and "description" if present in body.
  //-         Need to figure out what we want as a default behaviour here.
  //-         I'm simply going to hide the BlogHeader for now, but let's revisit soon.
  //-   TntBlogHeader(v-if="page" :page="page")/

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

  template(#toc v-if="page?.toc && page?.body.toc?.links.length")
    TntToc(:toc="page?.body.toc")

  TntBackground(v-if="backgroundPattern" :pattern="backgroundPattern")/
</template>
