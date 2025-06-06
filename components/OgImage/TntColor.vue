<!--
// Ideas:
// 1. Testimonial style OG Image with quote, name, avatar
// 2. Product style OG Image with product image, name, price (and discount)
// 3. Plain image (we still need to figure that one out too)
// 4. Project style with... downloads, stars, etc. displayed (we might need to regenerate site periodically if dependent on external API updates)

// Our first priority should be those types relevant to a brochure site:
// 1. Testimonial
// 2. Location would be cool - like a map with a pin for a "Where to find us" or "Contact" page.
-->

<script setup lang="ts">
import { computed, useAppConfig } from '#imports'
import { parseURL } from 'ufo'

const props = withDefaults(defineProps<{
  title?: string
  website?: string
  color?: string
}>(), {
  title: 'title',
  website: undefined,
  color: undefined,
})

// fallback to site name
const website = computed(() => {
  return props.website || useAppConfig().og?.website || parseURL(useAppConfig().site.url).host
})

// fallback to config color
const color = computed(() => {
  return props.color || useAppConfig().og?.color || '#000000'
})
</script>

<template>
  <div class="h-full w-full flex items-start justify-start text-white" :class="`bg-[${color}]`">
    <div class="flex items-start justify-start h-full">
      <div class="flex flex-col justify-between w-full h-full">
        <h1 class="text-[80px] p-20 font-black text-left" style="display: block; line-clamp: 2; text-overflow: ellipsis;">
          {{ title }}
        </h1>
        <p class="text-2xl pb-10 px-20 font-bold mb-0" style="display: block; line-clamp: 3; text-overflow: ellipsis;">
          {{ website }}
        </p>
      </div>
    </div>
  </div>
</template>