<script setup lang="ts">
import { computed, defineProps } from 'vue'

import { getStartOfWeek } from '../../utils/date'

const { locale, weekdayFormat = 'short' } = defineProps<{
  locale?: string
  weekdayFormat?: 'short' | 'long' | 'narrow' | undefined
}>()

const weekdays = computed(() => {
  const startOfWeek = getStartOfWeek(locale)
  const now = new Date()

  const startMs = now.setDate(now.getDate() - now.getDay() + startOfWeek)

  const formatter = new Intl.DateTimeFormat(locale, { weekday: weekdayFormat })

  const localeDayNames = Array(7)
    .fill('')
    .map((_, index) => formatter.format(new Date(startMs + index * 1000 * 60 * 60 * 24)))

  return localeDayNames
})
</script>

<template>
  <div class="grid grid-cols-7 text-gray-500">
    <span
      v-for="day in weekdays"
      :key="day"
      class="text-xs text-center"
    >
      {{ day }}
    </span>
  </div>
</template>
