<script setup lang="ts">
// TODO: This is fine but... we want to use the same concept for testimonials, right?
//       Attribution should accept a more author-like object (name, title, avatar, to)
//       and the styling should be different or more configurable. As much as possible,
//       we want common features and common ideas so that we can just slap these things
//       into place and change them up with those changes taking effect everywhere the
//       component is used.

const { attribution = undefined } = defineProps<{
  attribution?: string
}>()
</script>

<template lang="pug">
figure
  blockquote
    slot/
  figcaption(v-if="attribution") {{ attribution }}
</template>
