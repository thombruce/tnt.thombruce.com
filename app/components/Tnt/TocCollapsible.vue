<script setup lang="ts">
import type { Toc } from '@nuxt/content';

const {
  toc
} = defineProps<{
  toc: Toc
}>()

const tocOpen = ref(false)

// TODO: Still broken; please investigate
</script>

<template lang="pug">
UCollapsible(v-model:open="tocOpen" :unmount-on-hide="false" class="flex flex-col gap-2 md:hidden")
  UButton(
    label="On this page"
    color="neutral"
    variant="subtle"
    trailing-icon="lucide:chevron-down"
    block
    @click="tocOpen = !tocOpen"
  )/
  template(#content)
    TntToc(:toc="toc")
</template>
