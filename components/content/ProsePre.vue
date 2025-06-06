<!--
  Overrides the default ProsePre provided by Nuxt Content.
  This enables us to more easily set light and dark color
  themes, which are otherwise difficult to negotiate between
  conflicting rules of Tailwind Typography and Shiki language
  highlighting.
-->

<script setup lang="ts">
const { class: klass = undefined, language = undefined, filename = undefined } = defineProps<{
  class?: string
  language?: string
  filename?: string
}>()
</script>

<template lang="pug">
figure(class="relative")
  pre(class="bg-elevated" :class="klass")
    slot/
  figcaption(
    v-if="language || filename"
    class="absolute top-0 right-0 px-4 py-2 text-dimmed"
  ) {{ language }}{{ language && filename ? ': ' : '' }}{{ filename }}
</template>
