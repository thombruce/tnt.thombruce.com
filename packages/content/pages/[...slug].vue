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

defineOgImageComponent('TNT',
  {
    title: page.value?.title || null,
    description: page.value?.description || null,
    icon: page.value?.icon || null,
    // siteName: name,
    colorMode: 'dark',
    // theme: '#dc2626'
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
