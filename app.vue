<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()

// TODO: Move to appConfig or runtimeConfig
const { backgroundPattern } = useAppConfig()
</script>

<template lang="pug">
UApp(:locale="locales[locale]")
  //- TntCookieAlert depends on TNT Web
  TntCookieAlert/
  NuxtRouteAnnouncer/
  NuxtPage/
  //- TntBackground depends on TNT Fancy
  TntBackground(v-if="backgroundPattern" :pattern="backgroundPattern")/
</template>
