<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const copyright = tntTranslate('nuxtSiteConfig.copyright', useSiteConfig().copyright)

const { backgroundPattern } = useAppConfig()

const { public: { layers, googleAnalytics: { id: gaId } } } = useRuntimeConfig()

const footerLinks: NavigationMenuItem[] = []

if (layers.includes('tnt-web') && gaId) {
  // NOTE: /cookie-policy is registered automatically by the TNT Web module.
  //       A link will display in the footer if googleAnalytics is also active.
  // TODO: Expand to other cookie items, e.g. setting locale
  footerLinks.push({ label: 'Cookie Policy', icon: 'i-lucide:cookie', to: '/cookie-policy' })
}
</script>

<template lang="pug">
div(class="w-full \
           bg-neutral-50 \
           dark:bg-neutral-900 \
           border-t \
           border-neutral-200 \
           dark:border-neutral-800"
)
  UContainer
    UNavigationMenu(:items="footerLinks" variant="link" class="flex w-full justify-center z-50")

  UContainer(
    class="flex \
          items-center \
          justify-between"
  )
    div(class="py-2 grow text-center")
      p(v-if="copyright" class="text-sm text-muted") {{ copyright }}
      p(v-if="backgroundPattern" class="text-sm text-muted")
        a(href="https://heropatterns.com/") Hero Patterns
        |
        | by Steve Schoger (
        a(href="https://creativecommons.org/licenses/by/4.0/") CC By 4.0
        | )
</template>
