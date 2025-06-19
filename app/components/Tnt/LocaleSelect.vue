<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const computedLocales = computed(() => {
  return locales.value.map((l) => {
    return {
      code: l.code,
      label: l.name,
      icon: `circle-flags:lang-${l.code}`,
      onSelect() { setLocale(l.code) },
    }
  })
})

const computedLocale = computed(() => {
  return computedLocales.value.find(l => l.code === locale.value)
})
</script>

<template lang="pug">
ClientOnly
  USelectMenu(
    v-model="computedLocale"
    :items="computedLocales"
    color="neutral"
    variant="ghost"
    class="w-48 my-2 px-2.5 py-1.5"
  )
    template(#leading="{ modelValue, ui }")
      span(v-if="modelValue" class="size-5 text-center")
        Icon(:name="modelValue.icon")
</template>
