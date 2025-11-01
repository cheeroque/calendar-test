<script setup lang="ts">
import { computed, defineModel } from 'vue'

import { getArrayByLength } from '../../utils/index'
import { copyDate, getDaysInMonth, getStartOfWeek, isSameDay } from '../../utils/date'
import SharedButton from '../shared/SharedButton.vue'

const { locale, selectedMonth } = defineProps<{
  locale?: string
  selectedMonth: Date
}>()

const modelValue = defineModel<Date>({
  required: true
})

const startOfWeek = computed(() => getStartOfWeek(locale))

const grid = computed(() => {
  const daysInMonth = getDaysInMonth(selectedMonth)

  const date = copyDate(selectedMonth)
  const firstDayOfMonth = new Date(date.setDate(1))

  const offsetsArray = getRange(7)
  const shiftedOffsetsArray = offsetsArray.concat(offsetsArray.splice(0, 8 - startOfWeek.value))

  const leftPad = shiftedOffsetsArray[firstDayOfMonth.getDay() - 1] ?? 0

  return [
    ...getArrayByLength(leftPad),
    ...getRange(daysInMonth)
  ]
})

function getRange(length: number) {
  return getArrayByLength(length).map((_, index) => index)
}

function getDateFromDay(day: number) {
  const date = copyDate(selectedMonth)
  date.setDate(day)

  return date
}

function isActive(day: number) {
  return isSameDay(getDateFromDay(day), modelValue.value)
}

function isToday(day: number) {
  return isSameDay(getDateFromDay(day))
}

function handleClickDay(day: number) {
  modelValue.value = getDateFromDay(day)
}
</script>

<template>
  <div class="grid grid-cols-7">
    <div
      v-for="(day, index) in grid"
      :key="`cell-${index}`"
      class="flex aspect-square p-1"
    >
      <SharedButton
        v-if="day !== null"
        :data-active="isActive(day + 1) || undefined"
        :data-today="isToday(day + 1) || undefined"
        class="
          w-full text-center rounded border-2 border-transparent transition-colors hover:bg-blue-100
          data-active:font-medium data-active:text-white data-active:border-blue-600 data-active:bg-blue-600
          data-today:font-medium data-today:text-blue-600 data-today:border-blue-200 data-today:bg-blue-200
          data-active:data-today:text-white data-active:data-today:border-blue-200 data-active:data-today:bg-blue-600
          data-active:hover:text-white data-active:hover:bg-blue-700
          data-today:hover:bg-blue-300 data-active:data-today:hover:bg-blue-700
        "
        @click="handleClickDay(day + 1)"
      >
        {{ day + 1 }}
      </SharedButton>
    </div>
  </div>
</template>
