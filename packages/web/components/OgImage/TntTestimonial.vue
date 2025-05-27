<script setup lang="ts">
import { computed, useSiteConfig } from '#imports'

const props = withDefaults(defineProps<{
  testimonial?: string
  author?: { name: string, title: string, avatar: string }
  color?: string
}>(), {
  testimonial: '',
  author: undefined,
  color: undefined,
})

// fallback to config color
const color = computed(() => {
  return props.color || useSiteConfig().og?.color || '#000000'
})
</script>

<template>
  <div class="h-full w-full flex items-start justify-start text-white" :class="`bg-[${color}]`">
    <div class="w-full h-full flex absolute top-0 left-0">
      <span class="text-9xl opacity-42 absolute top-10 left-10"><Icon name="lucide:quote" mode="svg" /></span>
      <span class="text-9xl opacity-42 absolute bottom-20 right-10"><Icon name="lucide:quote" mode="svg" /></span>
    </div>

    <div class="flex items-start justify-start h-full">
      <div class="flex flex-col justify-between w-full h-full">
        <h1 v-if="testimonial" class="text-[80px] p-20 font-black text-left" style="display: block; line-clamp: 3; text-overflow: ellipsis;">
          {{ testimonial }}
        </h1>
        <p v-if="author?.name" class="text-2xl pb-10 px-20 mb-0" style="display: block; line-clamp: 2; text-overflow: ellipsis;">
          <span class="font-bold">{{ author.name }}</span>
          <span v-if="author.title" class="ml-3">{{ author.title }}</span>
        </p>
      </div>
    </div>
  </div>
</template>