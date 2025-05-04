<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<template lang="pug">
div
  //- TODO: Removed element with classes like:
  //- div(class="flex flex-col h-screen justify-between")
  //- This resulted in a bug on mobile whereby on navigation,
  //- page would not scroll. Hard refresh corrected the problem,
  //- but this just isn't how Nuxt navigation works.

  //- TODO: Maybe prefer to gracefully enhance content components
  //-       based on runtimeConfig, rather than duplicating or
  //-       overwriting them like this.
  TntContentHeader(v-if="runtimeConfig?.public?.content")/
  TntHeader(v-else)/
  UContainer(class="mb-auto")
    slot/
  TntFooter/
</template>