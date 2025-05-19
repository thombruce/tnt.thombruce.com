<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts'

const route = useRoute()

const collection = 'testimonials'

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection(collection).path(route.path).first()
})

const layout = (page.value?.layout || 'default') as LayoutKey

defineOgImageComponent('TntTestimonial',
  {
    /* TntColor, TntTestimonial */
    color: page.value?.og?.color || null,

    /* TntTestimonial */
    testimonial: page.value?.highlight,
    author: page.value?.author,
  }
)
</script>

<template lang="pug">
NuxtLayout(:name="layout" :collection="collection")
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
</template>
