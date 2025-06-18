<script setup lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/ui/timeline'
import type { ComponentConfig, TimelineItem } from '@nuxt/ui'

type Timeline = ComponentConfig<typeof theme, AppConfig, 'timeline'>

const {
  items,
  color,
  size,
  // orientation,
  reverse,
} = defineProps<{
  items: TimelineItem[]
  color: Timeline['variants']['color']
  size: Timeline['variants']['size']
  // TODO: orientation cannot be used until width stylings are modified
  //       ideally also allow for x-overflow scroll behavior
  // orientation?: Timeline['variants']['orientation']
  reverse?: boolean
}>()
</script>

<template lang="pug">
UTimeline(
  :default-value="items.length - 1"
  v-bind="$props"
  :items="items"
  :color="color"
  :size="size"
  :reverse="reverse"
  class="max-w-128 m-auto"
)/
</template>
