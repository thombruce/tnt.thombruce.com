<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()

const { backgroundPattern } = useSiteConfig()

// TODO:
// - Brochure view
// - Docs view
// - Article/blog view
// - (Micro)posts view
// - Gallery view
// - Shop view + Cart view + Checkout, etc., etc.
// - Pricing view
// - 
// - Calendar view
// - Table view (comparisons of pricing; above?)
// - 
// - List view (todo style)
// - Kanban view
// - 
// - Countdown view (event view?)

// Also, do determine storage mechanisms:
// - File system for desktop applications?
// - Browser-based database for in-browser use?
// ...and do also begin thinking about mobile app storage
//    as well as syncing with a server (requiring server side
//    database and authentication).

// Been thinking about membership sites too. The notion of having content
// that's locked behind account registration and a paywall...
// How does one do that with a static site? They don't, right? The best
// solution would be to store membership content behind authentication
// in a server-side database?

// And if we're, for example, hiding SOME blog content behind a membership
// wall (e.g. as a timed exclusive), then it kind of makes sense to store
// all blog content in the database... making it queryable, editable, easily
// transferable between members-only and open.

// This suggests that the static approach I **am** taking is the wrong one
// for some of my purposes... but don't throw it out just yet, no?

// Consider...
// - TNT
// - TNT Static

// Two variants of the TNT platform, with the latter noting its benefits and
// its pitfalls (lack of membership control).
</script>

<template lang="pug">
UApp(:locale="locales[locale]")
  NuxtRouteAnnouncer/
  NuxtPage/
</template>
