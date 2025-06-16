<script setup lang="ts">
// TODO: Enable background to be used in components like card/hero/etc.,
//       not just as the main page background.
// TODO: Allow background to be configured on/off and have its pattern,
//       color and opacity set in either TNT Config or AppConfig.
// TODO: Also enable it to be configured per-page... meaning probably we
//       move the TntBackground usage from app.vue to [...slug].vue, right?
//       As we'll need to access to the NuxtPage properties we access there.

import { formatHex } from 'culori'

/* Constants */

const colorMode = useColorMode()
const styles = getComputedStyle(document.documentElement)

/* Props */

// TODO: Allow color and opacity to be set as props too.
//       Preferably these should also allow for light and
//       dark options.
const { pattern } = defineProps<{
  pattern: string,
}>()

/* Refs */

const uiColor = ref(styles.getPropertyValue("--ui-bg-accented"))

/* Computed */

const color = computed(() => formatHex(uiColor.value))
const opacity = computed(() => colorMode.value === 'dark' ? 0.4 : 0.7)
const bgImage = computed(() => `url("${heroPattern(pattern, color.value, opacity.value)}")`)

/* Watch */

watch(colorMode, () => {
  /* Mod Constants */
  const styles = getComputedStyle(document.documentElement)
  /* Update Refs */
  uiColor.value = styles.getPropertyValue("--ui-bg-accented")
})
</script>

<template lang="pug">
div(
  class="fixed top-0 left-0 w-screen h-screen -z-50"
  :style="{ \
    backgroundImage: bgImage \
  }"
)
</template>
