<script setup lang="ts">
const { public: { layers } } = useRuntimeConfig()
</script>

<template lang="pug">
div(class="flex flex-col h-screen justify-between")
  //- TODO: Maybe prefer to gracefully enhance content components
  //-       based on runtimeConfig, rather than duplicating or
  //-       overwriting them like this.
  TntContentHeader(v-if="layers.includes('tnt-content')")/
  TntHeader(v-else)/
  UContainer(class="mb-auto")
    slot/
  TntFooter/
</template>