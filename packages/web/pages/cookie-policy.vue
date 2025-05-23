<script setup lang="ts">
import type { LayoutKey } from '#build/types/layouts'
import type { PagesCollectionItem } from '@nuxt/content'

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('pages').path(route.path).first()
})

const layout = (page.value?.layout || 'default') as LayoutKey

for (const func of useAppConfig().pageFunctions as ((page?: PagesCollectionItem | null) => void)[]) {
  func(page.value)
}

const policy = tntCookiePolicyBoilerplate()
</script>

<template lang="pug">
NuxtLayout(:name="layout")
  ContentRenderer(
    v-if="page"
    :value="page"
    class="prose \
          dark:prose-invert \
          max-w-none"
  )/

  MDC(
    v-else
    :value="policy"
    class="prose \
          dark:prose-invert \
          max-w-none"
  )/
</template>
