<script setup lang="ts">
const { theme }: { theme?: 'solid' | 'ghost' } = useAttrs()

// TODO: Ideally... we could trigger variants of all components used by the layout
//       by passing some property to the layout.
//       Layouts are invoked by other layouts or from [...slug].vue (pages).
//       We would like then for the pages to be able to call on appConfig and pass
//       the relevant property (possibly overwriteable per document) to say like...
//       - We want this to be "flat", "glass", "ghost", some predefined variant
//       And we pass that configuration to each component invoked?
</script>

<template lang="pug">
div(class="flex flex-col h-screen justify-between")
  TntHeader(:variant="theme")/
  UContainer(class="mb-auto")
    slot/
  TntFooter(:variant="theme")/
</template>