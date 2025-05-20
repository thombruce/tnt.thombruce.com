<script setup lang="ts">
const props = withDefaults(defineProps<{
  image?: string
}>(), {
  image: undefined,
})

// fallback to site name
const image = computed(() => {
  return props.image || useSiteConfig().og?.image
})
</script>

<template>
  <NuxtImg
    :src="image"
    width="2048"
    class="w-full h-full"
  />
</template>
