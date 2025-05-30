<script setup lang="ts">
/* :WIP: */

// A Calendar component using the HTML table element

import {
  today as getToday,
  getLocalTimeZone,
  startOfMonth as getStartOfMonth,
  endOfMonth as getEndOfMonth,
  startOfWeek as getStartOfWeek,
  endOfWeek as getEndOfWeek,
  type CalendarDate
} from '@internationalized/date'

import _groupBy from 'lodash/groupBy'

const locale = 'en-US',
      firstDayOfWeek = 'sun',
      months = [undefined, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

if (firstDayOfWeek === 'sun') weekdays.unshift('Sun')
else weekdays.push('Sun')

// TODO: Seriously think about i18n here. Those month values, those weekdays...
//       solid contenders for early internationalization as such values are easy
//       to find. But we must think about how that is going to work when we are
//       converting from known (or integer) values to the internationalized form.

const today = getToday(getLocalTimeZone())
const startOfMonth = getStartOfMonth(today)
const endOfMonth = getEndOfMonth(today)

// TODO: It occurs to me that "today" is a redundant value if we have a given month.
//       We use it in the template below to highlight the current day, but for the
//       vast majority of months possible... we don't need today's date. We only need
//       it if we must calculate the current month in lieu of a given month for the
//       calendar.
//       So like... add a `month` prop and figure that out.
//       Maybe add specific date props? Like for a selected date? Or selected date range?
//       There are going to be a few ways to manipulate the calendar, for sure.

const startDate = getStartOfWeek(startOfMonth, locale, firstDayOfWeek)
const endDate = getEndOfWeek(endOfMonth, locale, firstDayOfWeek)

const dates = [startDate] as CalendarDate[]
let iterDate = startDate

while (iterDate.compare(endDate) < 0) {
  iterDate = iterDate.add({ days: 1 })
  dates.push(iterDate)
}

const weekGroups = _groupBy(dates, (d: CalendarDate) => getStartOfWeek(d, locale, firstDayOfWeek))
</script>

<template lang="pug">
section(class="not-prose")
  div(class="text-center text-xl font-bold") {{ months[today.month] }}

  table(class="w-full table-fixed")
    thead
      th(v-for="weekday in weekdays" class="text-dimmed") {{ weekday }}

    tbody
      tr(v-for="weekGroup in weekGroups")
        td(v-for="date in weekGroup")
          div(class="aspect-square text-right")
            span(:class="date.compare(today) == 0 ? 'text-primary font-bold' : ''") {{ date.day }}
</template>
