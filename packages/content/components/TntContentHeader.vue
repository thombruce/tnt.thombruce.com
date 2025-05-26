<script setup lang="ts">
const { name } = useSiteConfig()

const { nav: navConfig } = useAppConfig()

const { data: navItems } = await useAsyncData(`tntNav-for-content`, () => {
  return tntNav(navConfig)
})
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
    div(class="flex")
      TntNavigationDrawer(:items="navItems")/

      UButton(
        :label="name"
        to="/"
        color="neutral"
        variant="ghost"
        class="my-2 px-2.5 py-1.5 font-extrabold"
      )/

    UNavigationMenu(
      :items="navItems || undefined"
      :unmount-on-hide="false"
      class="hidden md:flex w-full justify-center z-50"
    )/

    div(class="flex")
      TntSearch/
      TntDarkMode/
</template>
