<script setup lang="ts">
// TODO: This is working in a content page as of now.
//       It may not when rendered statically...?
//       Investigate and... probably move to a
//       components/global/ dir if that's the case.
import { fromDate, toTime, toTimeZone, toLocalTimeZone, type ZonedDateTime } from '@internationalized/date'

const { type = 'digital', timezone = undefined } = defineProps<{
  // TODO: Implement analog.
  type?: 'digital' | 'analog', // timer | countdown
  timezone?: string,
  // 24hr vs 12hr
}>()

const getTimeNow = () => fromDate(new Date(), 'UTC')

const time = ref(getTimeNow())

// TODO: It is safe to move this interval to a composable
//       since conversion is now handled separately below.
useIntervalFn(() => time.value = getTimeNow(), 500)

const timeInZone = computed(() => {
  const t = timezone
    ? toTimeZone(time.value as ZonedDateTime, timezone)
    : toLocalTimeZone(time.value as ZonedDateTime)
  return toTime(t)
})
</script>

<template lang="pug">
span(v-if="type === 'digital'") {{ timeInZone.toString().split('.')[0] }}
</template>
