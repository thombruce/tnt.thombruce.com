<script lang="ts" setup>
import type { PageCollections } from '@nuxt/content';

const { collection = 'pages' }: { collection?: keyof PageCollections | undefined } = useAttrs()
</script>

<template lang="pug">
NuxtLayout(name="base")
  div(class="grid grid-cols-10 gap-10")
    div(class="col-span-10")
      TntBreadcrumbs(:collection="collection")/

      slot(name="header")

      slot

      TntPrevNext(:collection="collection")/
</template>
