<script lang="ts" setup>
import type { PageCollections } from '@nuxt/content';

const { collection = 'pages' }: { collection?: keyof PageCollections | undefined } = useAttrs()
</script>

<template lang="pug">
NuxtLayout(name="base")
  .grid.grid-cols-10.gap-10
    div(:class="($slots.toc) ? 'col-span-10 md:col-span-8' : 'col-span-10'")
      TntBreadcrumbs(:collection="collection")/

      slot(name="header")

      //- TODO: On sm and lower, we also want Toc here!

      slot

      TntPrevNext(:collection="collection")/

    .col-span-2(v-if="$slots.toc" class="hidden md:flex")
      slot(name="toc")
</template>
