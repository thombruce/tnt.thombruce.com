<script setup lang="ts">
// In theory, this cookie notice now displays if...
// 1. NUXT_PUBLIC_GOOGLE_ANALYTICS_ID is set as an env var
// 2. The visitor has not already consented
// 3. The visitor has not otherwise closed the alert
//
// Sounds like accurate behaviour to me.
//
// The best way to test it is probably to now set up Google Analytics
// and give it a whirl.

import {today, getLocalTimeZone} from '@internationalized/date'

const config = useRuntimeConfig()
const gaID = (config.public?.googleAnalytics as { id: string })?.id

// TODO: The date set in the cookie does appear to be incorrect.
//       It is May 7th at 16:40:00 now, date set was May 6th at
//       23:00:00 GMT. Not a major issue; just wondering why the
//       minor discrepancy? Is getLocalTimeZone() retrieving
//       incorrect zone?
// TODO: It does occur to me that it is definitely setting a stale
//       time at the time of acceptance, yes? Since we are generating
//       this date at the time of page load. We ought to instead
//       generate it at the point of acceptance, using say a custom
//       consent/acceptCookies function. (This does not really relate
//       to the issue described above though).

const oneYearLater = today(getLocalTimeZone()).add({ years: 1 }).toDate(getLocalTimeZone())

const consent = useCookie<boolean>('consent', { expires: oneYearLater })

useScriptGoogleAnalytics({
  id: gaID || '',
  scriptOptions: {
    trigger: consent
  }
})

// TODO: It is also presently pointless to...
//       1. Have a "Manage" option; we need to look into managing individual cookies via modal.
//       2. Show the notice at all if a Google Analytics tag isn't provided, since it is the
//          only cookie we are presently managing.
//       What other cookies might we want to manage?
//       Ad services? E.g. adsense. Those set cookies too, I think.
//       Previously viewed / history is a good idea and... probably counts as non-essential for
//       site functionality. It would be kinda dope to be able to say hey, here's what you've been
//       looking at on the site or hey, here's where you left off. Do you want to return there?

// TODO: We should also respect the decision to reject non-essential cookies.
//       As of now, we will continue to ask the user about cookies on subsequent visits...
//       Is it possible to store the rejection preference? We would do so in a cookie, ironically.

const open = ref(true)

const close = () => { open.value = false }
</script>

<template lang="pug">
div(v-if="gaID && !consent && open" class="fixed bottom-5 w-screen px-2 md:px-12")
  UAlert(
    title="Heads up!"
    description="You can change the primary color in your app config."
    color="neutral"
    variant="solid"
    close
    @update:open="close()"
    :actions="[ \
      { \
        label: 'Accept', \
        icon: 'i-lucide:cookie', \
        color: 'success', \
        onClick: () => { consent = true } \
      }, \
      { \
        label: 'Reject', \
        icon: 'i-lucide:ban', \
        color: 'error', \
        onClick: close, \
      }, \
    ]"
  )/
</template>
