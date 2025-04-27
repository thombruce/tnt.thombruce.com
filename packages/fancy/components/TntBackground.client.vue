<script setup lang="ts">
import { formatHex } from 'culori'

// TODO: Enable background to be used in components like card/hero/etc.,
//       not just as the main page background.
// TODO: Allow background to be configured on/off and have its pattern,
//       color and opacity set in either TNT Config or AppConfig.
// TODO: Also enable it to be configured per-page... meaning probably we
//       move the TntBackground usage from app.vue to [...slug].vue, right?
//       As we'll need to access to the NuxtPage properties we access there.

const colorMode = useColorMode()

// TODO: Allow color and opacity to be set as props too.
//       Preferably these should also allow for light and
//       dark options.
const { pattern } = defineProps<{
  pattern: string,
}>()

const color = ref()
const opacity = ref(0.4)

watch(colorMode, () => {
  // TODO: The following constants are why this background component
  //       is client only. Reconfigure it in such a way that some non-theme
  //       but sensible fallback colors are used when rendered from the server.
  const styles = getComputedStyle(document.documentElement)
  const uiColor = styles.getPropertyValue("--ui-bg-accented")

  color.value = formatHex(uiColor)
  opacity.value = colorMode.value === 'dark' ? 0.4 : 0.7
})

const bgImage = computed(() => `url("${heroPattern(pattern, color.value, opacity.value)}")`)
</script>

<template lang="pug">
div(
  class="fixed top-0 left-0 w-screen h-screen -z-50"
  :style="{ \
    backgroundImage: bgImage \
  }"
)
</template>
