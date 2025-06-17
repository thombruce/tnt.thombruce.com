<script setup lang="ts">
// TODO: Explicitly list all props, even those that will be handled by UAlert.
//       This will ensure that they show up in Studio.
const {
  title = undefined,
  description = undefined,
  template = undefined,
  color = undefined,
  icon = undefined,
  variant = "subtle",
  large
} = defineProps<{
  title?: string
  description?: string
  template?: "success" | "info" | "warning" | "error"

  color?: "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral"
  icon?: string
  variant?: "subtle" | "solid" | "outline" | "soft"

  large?: boolean
}>()

const computedColor = computed(() => {
  return color || template
})

const computedIcon = computed(() => {
  if (icon) return icon
  else if (template === "success") return "lucide:check" // "fluent-color:checkmark-circle-16"
  else if (template === "info") return "lucide:info" // "fluent-color:question-circle-16"
  else if (template === "warning") return "lucide:triangle-alert" // "fluent-color:error-circle-16"
  else if (template === "error") return "lucide:ban" // "fluent-color:dismiss-circle-16"
  else return undefined
})

const computedUi = computed(() => {
  return large ? { title: 'text-lg md:text-xl', icon: 'text-2xl md:text-3xl' } : { icon: 'text-xl' }
})
</script>

<template lang="pug">
UAlert(
  v-bind="$props"
  :title="title"
  :description="description"
  :color="computedColor"
  :icon="computedIcon"
  :ui="computedUi"
  :variant="variant"
)
</template>
