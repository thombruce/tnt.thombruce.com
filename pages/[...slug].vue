<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts'
import type { PageCollections } from '@nuxt/content'

const route = useRoute()

const { public: { collections } } = useRuntimeConfig()

const { ui: { theme, layout: defaultLayout } } = useAppConfig()

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

const layout = (page.value?.layout || defaultLayout || 'default') as LayoutKey

definePageMeta({
  colorMode: pageMeta.colorMode
})

tntOgImageComponent(page.value?.ogComponent, {
  title: page.value?.og?.title || page.value?.title,
  description: page.value?.og?.description || page.value?.description,
  icon: page.value?.og?.icon || page.value?.icon,
  logo: page.value?.og?.logo,
  // siteLogo: page.value?.og?.siteLogo,
  headline: page.value?.og?.headline || page.value?.headline,
  website: page.value?.og?.website,
  color: page.value?.og?.color,
  image: page.value?.og?.image || page.value?.image,
  // theme: page.value?.og?.theme,
  bg: page.value?.og?.bg,
  emoji: page.value?.og?.emoji,
  testimonial: page.value?.og?.headline || page.value?.headline,
  author: page.value?.author,
})
</script>

<template lang="pug">
NuxtLayout(:name="layout" :theme="theme" :collection="collection")
  template(#nav)
    UNavigationMenu(
      :items="navItems || undefined"
      orientation="vertical"
      :unmount-on-hide="false"
    )/

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

  template(#toc v-if="page?.body.toc?.links.length")
    TntToc(:toc="page?.body.toc")
</template>
