<script setup lang="ts">
const { name } = useSiteConfig()
</script>

<template lang="pug">
div(class="w-full \
           bg-neutral-50 \
           dark:bg-neutral-900 \
           border-b \
           border-neutral-200 \
           dark:border-neutral-800"
)
  UContainer(
    class="flex \
          items-center \
          justify-between"
  )
    UButton(
      :label="name"
      to="/"
      color="neutral"
      variant="ghost"
      class="my-2 px-2.5 py-1.5 font-extrabold"
    )/
    .flex
      TntDarkMode/
</template>
