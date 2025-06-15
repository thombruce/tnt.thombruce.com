<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()
</script>

<template lang="pug">
UApp(:locale="locales[locale]")
  NuxtRouteAnnouncer/

  TntCookieAlert/

  NuxtPage/
</template>
