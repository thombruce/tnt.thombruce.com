<script setup lang="ts">
const { success, info, warning, error, large } = defineProps<{
  success?: boolean
  info?: boolean
  warning?: boolean
  error?: boolean
  large?: boolean
}>()

let color: "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral" | undefined, icon: string

if (success) {
  color = "success"
  icon = "i-lucide:check" // "fluent-color:checkmark-circle-16"
} else if (info) {
  color = "info"
  icon = "i-lucide:info" // "fluent-color:question-circle-16"
} else if (warning) {
  color = "warning"
  icon = "i-lucide:triangle-alert" // "fluent-color:error-circle-16"
} else if (error) {
  color = "error"
  icon = "i-lucide:ban" // "fluent-color:dismiss-circle-16"
}

const ui = large ? { title: 'text-lg md:text-xl', icon: 'text-2xl md:text-3xl' } : { icon: 'text-xl' }
</script>

<template lang="pug">
UAlert(
  :color="color"
  :icon="icon"
  :ui="ui"
  variant="subtle"
  v-bind="$props"
)
</template>
