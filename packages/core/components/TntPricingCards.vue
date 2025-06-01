<script setup lang="ts">
const {
  cards
} = defineProps<{
  cards: object[]
}>()
</script>

<template lang="pug">
div(class="flex flex-wrap justify-center gap-4")
  //- NOTE: basis-[fraction] values are set a level higher than desired due to issues with margin/padding/gap.
  TntPricingCard(v-for="card in cards" v-bind="card" class="flex-grow basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/5")
</template>
