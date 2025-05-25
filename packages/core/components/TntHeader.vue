<script setup lang="ts">
const { name } = useSiteConfig()
</script>

<template lang="pug">
div(class="w-full \
           bg-muted \
           border-b \
           border-accented"
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
    div(class="flex")
      TntDarkMode/
</template>
