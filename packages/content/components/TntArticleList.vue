<script lang="ts" setup>
import type { PageCollections } from '@nuxt/content'

const { collection, path, order = { field: 'stem', direction: 'ASC' } } = defineProps<{
  collection: string,
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  order?: { field: any, direction: 'ASC' | 'DESC' }
}>()

const { data: items } = await useAsyncData(`tntList-for-${collection}-${path}`, () => {
  return queryCollection(collection as keyof PageCollections)
    .where('extension', '=', 'md')
    .where('path', 'LIKE', `${path}/%`)
    // .select('title', 'path', 'description', 'stem', 'date')
    .order(order.field, order.direction)
    .all()
})
</script>

<template lang="pug">
div(class="my-4 space-y-4")
  ULink(v-if="items?.length" v-for="item in items" :to="item.path" class="block")
    UCard
      div(class="grid grid-cols-10 gap-10")
        div(:class="item.image ? 'col-span-7' : 'col-span-10'")
          div(class="space-x-3")
            //- TODO: Wouldn't it be cool to be able to define custom metadata?
            //- Perhaps we can achieve this with scoped slots passing the retrieved
            //- page data back to the component invocation.
            UBadge(v-if="'category' in item && item.category" color="neutral" variant="outline") {{ item.category }}
            strong(v-if="'date' in item && item.date") {{ new Date(item.date).toLocaleDateString() }}
          div(class="space-y-2")
            h2(class="text-2xl font-extrabold") {{ item.title }}
            p {{ item.description }}
          div
            div(
              v-if="'authors' in item && item.authors"
              v-for="author in item.authors"
              class="px-2.5 py-1.5 text-sm space-x-1.5 inline-block"
            )
              UAvatar(:src="author.avatar?.src" size="2xs")
              span {{ author.name }}
        div(class="col-span-3")(v-if="item.image")
          div(class="block aspect-square")
            NuxtImg(:src="item.image" fit="cover" width="600" height="600" class="w-full h-full object-cover")
  div(v-else)
    p No items to show.
</template>
