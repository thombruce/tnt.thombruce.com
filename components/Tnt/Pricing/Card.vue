<script setup lang="ts">
// TODO: Defaults? Optionality? (They're currently all optional - some should be necessary, right?)
const {
    highlight = false,
    title = undefined,
    badge = undefined,
    description = undefined,
    price = undefined,
    discount = undefined,
    features = undefined,
    button = undefined,
    terms = undefined
} = defineProps<{
  highlight?: boolean
  title?: string
  badge?: string
  description?: string
  price?: string
  discount?: string
  features?: string[]
  button?: object
  terms?: string
}>()
</script>

<template lang="pug">
article(class="not-prose")
  UCard(variant="outline" class="w-full h-full" :class="highlight ? 'border-2 border-primary' : ''")
    template(#header)
      header(class="flex flex-col gap-3")
        //- TODO: Use border attributes above only when the card is highlighted!
        //-       Let's get Tailwind Variants in play.
        div(class="flex items-center gap-3")
          h1(class="text-3xl font-semibold") {{ title }}
          UBadge(v-if="badge" size="lg" variant="subtle" class="align-center py-0.5") {{ badge }}
        p(class="text-toned") {{ description }}

        div
          span(class="align-super line-through text-2xl text-muted") {{ price }}
          span(class="text-4xl font-semibold") {{ discount }}

    template(#default v-if="features")
      ul
        li(v-for="feature in features" class="flex items-center gap-2")
          Icon(name="lucide:circle-check" class="text-primary")
          | {{ feature }}
    
    template(#footer v-if="button || terms")
      footer(class="flex flex-col gap-3")
        UButton(v-if="button" size="lg" class="w-full font-semibold" :ui="{ label: 'mx-auto' }" v-bind="button")
        p(v-if="terms" class="text-sm text-muted") {{ terms }}
</template>