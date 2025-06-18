<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"

const { items: navItems } = defineProps<{
  items: NavigationMenuItem[] | null,
}>()

const open = ref(false)
</script>

<template lang="pug">
UDrawer(v-model:open="open" direction="left" class="md:hidden")
  UButton(
    icon="lucide:menu"
    color="neutral"
    variant="ghost"
    class="my-2 px-2.5 py-1.5"
  )
  template(#content)
    UNavigationMenu(
      :items="navItems || undefined"
      orientation="vertical"
      :unmount-on-hide="false"
      @click="open = false"
    )/
</template>
