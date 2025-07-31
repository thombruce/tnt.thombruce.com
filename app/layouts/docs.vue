<script lang="ts" setup>
import type { PageCollections } from '@nuxt/content'

const { page, collection = 'pages', theme }: { page?: any, collection?: keyof PageCollections, theme?: 'solid' | 'ghost' } = useAttrs()

// NOTE: useAsyncData removed
const navItems = await tntNav(true, collection)

const showNav = computed(() => page?.nav !== false && navItems)
const showToC = computed(() => page?.toc !== false && page?.body.toc?.links.length)
</script>

<template lang="pug">
div(class="flex flex-col h-screen justify-between")

  TntHeader(:variant="theme" :collection="collection")/

  UContainer(class="mb-auto")

    div(class="grid grid-cols-10 gap-10")

      div(v-if="showNav" class="col-span-2 hidden md:flex")

        UNavigationMenu(
          :items="navItems"
          orientation="vertical"
          :unmount-on-hide="false"
        )/

      div(:class="(showNav && showToC) ? 'col-span-10 md:col-span-6' : (showNav || showToC) ? 'col-span-10 md:col-span-8' : 'col-span-10'")

        TntTocCollapsible(v-if="showToC" :toc="page?.body.toc")/

        TntBreadcrumbs(v-if="page?.breadcrumbs !== false" :collection="collection")/

        slot

        TntPrevNext(v-if="page?.prevnext !== false" :collection="collection")/

      div(v-if="showToC" class="col-span-2 hidden md:flex")
        div
          strong On this page
          TntToc(:toc="page?.body.toc")

  TntFooter(:variant="theme" :collection="collection")/
</template>
