<script lang="ts" setup>
import type { PageCollections } from '@nuxt/content'

const { page, theme, collection = 'pages' }: { page?: any, theme?: 'solid' | 'ghost', collection?: keyof PageCollections } = useAttrs()
</script>

<template lang="pug">
div(class="flex flex-col h-screen justify-between")

  TntHeader(:variant="theme" :collection="collection")/

  UContainer(class="mb-auto")

    TntBreadcrumbs(v-if="page?.breadcrumbs !== false" :collection="collection")/

    slot/

    TntPrevNext(v-if="page?.prevnext !== false" :collection="collection")/

  TntFooter(:variant="theme" :collection="collection")/
</template>
