<script setup lang="ts">
const copyright = tntTranslate('nuxtSiteConfig.copyright', useSiteConfig().copyright)

const { backgroundPattern } = useAppConfig()
</script>

<template lang="pug">
div(class="w-full \
           bg-neutral-50 \
           dark:bg-neutral-900 \
           border-t \
           border-neutral-200 \
           dark:border-neutral-800"
)
  UContainer(
    class="flex \
          items-center \
          justify-between"
  )
    div(class="py-2 grow text-center")
      p(v-if="copyright") {{ copyright }}
      p(v-if="backgroundPattern")
        a(href="https://heropatterns.com/") Hero Patterns
        |
        | by Steve Schoger (
        a(href="https://creativecommons.org/licenses/by/4.0/") CC By 4.0
        | )
</template>
