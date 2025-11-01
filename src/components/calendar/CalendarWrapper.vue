<script setup lang="ts">
import { computed, defineModel, defineProps, ref } from 'vue'

import CalendarGrid from './CalendarGrid.vue'
import CalendarHeader from './CalendarHeader.vue'
import CalendarWeekdays from './CalendarWeekdays.vue'

import { formatDate, parseDate } from '../../utils/date'

const { locale = 'en-US' } = defineProps<{
  locale?: string
}>()

const modelValue = defineModel<string>()

const dateValue = computed({
  get: () => parseDate(modelValue.value) ?? new Date(),
  set: (date: Date) => {
    modelValue.value = formatDate(date)
  }
})

const selectedMonth = ref(dateValue.value)
</script>

<template>
  <div class="relative w-100 flex flex-col p-3 gap-3 rounded-md border border-gray-200 bg-white">
    <CalendarHeader
      v-model="selectedMonth"
      :locale
    />

    <CalendarWeekdays :locale />

    <CalendarGrid
      v-model="dateValue"
      :locale
      :selected-month
    />
  </div>
</template>
