<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()

const { ui: { pattern: backgroundPattern } } = useAppConfig()
</script>

<template lang="pug">
UApp(:locale="locales[locale]")
  NuxtRouteAnnouncer/

  TntCookieAlert/

  NuxtPage/

  //- TODO: Move me to [...slug].vue and allow per-page config.
  //-       (Requires fixing color-change on page nav and setting the
  //-       color appropriately on page load, rather than waiting for
  //-       a watched event).
  TntBackground(v-if="backgroundPattern" :pattern="backgroundPattern")/
</template>
