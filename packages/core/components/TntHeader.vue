<script setup lang="ts">
const { name, /* nav: navConfig */ } = useSiteConfig()

// const { data: navItems } = await useAsyncData(`tntNav-for-content`, () => {
//   return tntNav(navConfig)
// })
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
    //- UNavigationMenu(:items="navItems || undefined" class="w-full justify-center z-50")/
    .flex
      //- TntSearch/
      TntDarkMode/
</template>
