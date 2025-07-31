<script lang="ts" setup>
import type { PageCollections } from '@nuxt/content'

const { page, collection = 'pages' }: { page?: any, collection?: keyof PageCollections } = useAttrs()
</script>

<template lang="pug">
div(class="flex flex-col h-screen justify-between")

  UContainer(class="mb-auto")

    TntBreadcrumbs(v-if="page?.breadcrumbs" :collection="collection")/

    slot/

    TntPrevNext(v-if="page?.prevnext" :collection="collection")/
</template>
