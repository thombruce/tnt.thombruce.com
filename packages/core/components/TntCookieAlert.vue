<script setup lang="ts">
// Good news is the analytics is definitely working...
// Bad news? I'm not entirely sure page views are registering correctly?
// Something to look into. But we can and probably should be using the proxy
// API from Nuxt Scripts to more accurately tag analytics behaviour... and for that
// we should... what? Add like a route watcher with a pageView proxy?
// Optionally also add like... conversion events on specific buttons? At client
// discretion, I would imagine... We need to look at what event types are possible
// to register and deliver an accurate analytics experience.

const config = useRuntimeConfig()
const gaID = (config.public?.googleAnalytics as { id: string })?.id

const consented = useCookie<boolean>('cookieConsent', { maxAge: 60 * 60 * 24 * 365 })
const rejected = useCookie<boolean>('cookieReject', { maxAge: 60 * 60 * 24 * 30 })

useScriptGoogleAnalytics({
  id: gaID || '',
  scriptOptions: {
    trigger: consented
  }
})

const open = ref(true)

/* Actions */
const acceptAll = () => { consented.value = true }
const rejectAll = () => { rejected.value = true }
const close = () => { open.value = false }
</script>

<template lang="pug">
div(v-if="gaID && !consented && !rejected && open" class="fixed bottom-5 w-screen px-2 md:px-12")
  UAlert(
    title="Heads up!"
    description='This site uses cookies to enhance your browsing experience and analyse traffic. By clicking "Accept", you consent to our use of cookies.'
    color="neutral"
    variant="solid"
    close
    @update:open="close()"
    :actions="[ \
      { \
        label: 'Accept', \
        icon: 'lucide:cookie', \
        color: 'success', \
        onClick: acceptAll \
      }, \
      { \
        label: 'Reject', \
        icon: 'lucide:ban', \
        color: 'error', \
        onClick: rejectAll, \
      }, \
    ]"
  )/
</template>
