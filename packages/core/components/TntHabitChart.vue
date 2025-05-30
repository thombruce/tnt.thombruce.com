<script setup lang="ts">
/* :WIP: */

// A GitHub Contributions-like chart of habits.

import {
  today as getToday,
  getLocalTimeZone,
  getDayOfWeek,
  type CalendarDate
} from '@internationalized/date'

import _groupBy from 'lodash/groupBy'

const today = getToday(getLocalTimeZone())
const oneYearAgo = today.subtract({ years: 1 })

const dates = [oneYearAgo] as (CalendarDate | null)[]
let iterDate = oneYearAgo

// TODO: Maybe pull from startOfWeek of the initial week, so as not to have blank spaces at beginning of habit chart

while (iterDate.compare(today) < 0) {
  iterDate = iterDate.add({ days: 1 })
  dates.push(iterDate)
}

const locale = 'en-US', firstDayOfWeek = 'sun'

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
if (firstDayOfWeek === 'sun') weekdays.unshift('Sun')
else weekdays.push('Sun')

const weekdayGroups = _groupBy(dates, (d: CalendarDate) => getDayOfWeek(d, locale, firstDayOfWeek)) // TODO: Determine user locale; make 'sun' optional/configurable

for (const weekday in weekdayGroups) {
  // Pad the start of each weekdayGroup if the initial date falls after oneYearAgo
  if ((weekdayGroups[weekday][0] as CalendarDate).compare(oneYearAgo) > 0 && Number(weekday) < getDayOfWeek(oneYearAgo, locale, firstDayOfWeek)) {
    weekdayGroups[weekday].unshift(null)
  }
  
  // Pad the end of each weekdayGroup if the last date falls before today
  if ((weekdayGroups[weekday][weekdayGroups[weekday].length - 1] as CalendarDate).compare(today) < 0 && Number(weekday) > getDayOfWeek(today, locale, firstDayOfWeek)) {
    weekdayGroups[weekday].push(null)
  }
}

// Now what this needs is to be reconstructed into a computed property...
// Tidied up a bit. Right now, I only see values on a page refresh but
// it should be showing on a HMR too.
</script>

<template lang="pug">
table(class="not-prose w-full")
  //- TODO: thead -> th with months indicating where each new month starts
  //-       This will require determining from the maximum number of dates
  //-       in a weekday collection how many th elements to iterate over,
  //-       then for i finding the column where each month starts...
  //-       No idea if there's a cleaner way about that.
  //-       Maybe if it were a two-dimensional array or matrix...?
  //-       It might make this simpler and the below slightly more complex.
  tbody(class="leading-none")
    tr(v-for="weekday, i in weekdayGroups")

      td(class="pr-3 text-sm") {{ [0, 3, 6].includes(Number(i)) ? weekdays[Number(i)] : null }}

      td(v-for="date in weekday" class="")
        UTooltip(v-if="date" :text="String(date)")
          //- NOTE: Icon removed for now due to inconsistent sizing.
          UButton(
            color="neutral"
            variant="subtle"
            class="aspect-square size-5"
          )/
          //- TODO: Even at the smallest size value, these buttons are kinda big...
          //-       We want to be able to go even smaller with the table items.
          //-       Maybe this means creating a new size to add to UI Theme: xxs
          //- NOTE: You can achieve smaller by applying a `size-i` class to the
          //-       ui: { base } property. We should, when the display is too small,
          //-       NOT show any icon or text.

          //- TODO: At smaller sizes, we should also adjust the rounded-[] value of
          //-       of the buttons; keep them looking more like square pips rather than
          //-       circular.
</template>
