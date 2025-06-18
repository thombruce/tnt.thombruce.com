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
      months = [undefined, 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
      weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

if (firstDayOfWeek === 'sun') weekdays.unshift('sunday')
else weekdays.push('sunday')

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
  div(class="text-center text-xl font-bold") {{ $t(`dateTime.${months[today.month]}`) }}

  table(class="w-full table-fixed")
    thead
      //- TODO: Consider further abbreviation to first letter when rendered small if relevant
      th(v-for="weekday in weekdays" class="text-dimmed") {{ $t(`dateTime.abbr.${weekday}`) }}

    tbody
      tr(v-for="weekGroup in weekGroups")
        td(v-for="date in weekGroup")
          div(class="aspect-square text-right")
            //- TODO: add muted style if not current month
            span(:class="date.compare(today) == 0 ? 'text-primary font-bold' : ''") {{ date.day }}
</template>
