<script lang="ts" setup>
import type { PageCollections } from '@nuxt/content';

const { collection = 'pages' }: { collection?: keyof PageCollections | undefined } = useAttrs()
</script>

<template lang="pug">
NuxtLayout(name="base")
  div(class="grid grid-cols-10 gap-10")
    div(v-if="$slots.nav" class="col-span-2 hidden md:flex")
      slot(name="nav")

    div(:class="($slots.nav && $slots.toc) ? 'col-span-10 md:col-span-6' : ($slots.nav || $slots.toc) ? 'col-span-10 md:col-span-8' : 'col-span-10'")
      TntBreadcrumbs(:collection="collection")/

      slot(name="header")

      //- TODO: On sm and lower, we also want Toc here!

      slot

      TntPrevNext(:collection="collection")/

    div(v-if="$slots.toc" class="col-span-2 hidden md:flex")
      slot(name="toc")
</template>
