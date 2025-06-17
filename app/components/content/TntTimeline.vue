<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const {
  items,
} = defineProps<{
  items: TimelineItem[]
}>()
</script>

<template lang="pug">
UTimeline(:default-value="items.length - 1" :items="items" class="w-96 m-auto")/
</template>
