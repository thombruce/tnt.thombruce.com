<script setup>
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template lang="pug">
ClientOnly(v-if="!colorMode?.forced")
  USwitch(
    v-model="isDark"
    unchecked-icon="lucide:sun"
    checked-icon="lucide:moon"
    class="my-2 px-2.5 py-1.5"
    color="neutral"
    aria-label="Dark mode toggle"
  )/
  template(#fallback)
    div(class="size-8 my-2 px-2.5 py-1.5")/
</template>
