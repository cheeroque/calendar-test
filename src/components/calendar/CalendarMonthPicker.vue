<script setup lang="ts">
import { computed, defineModel, defineProps } from 'vue'

import SharedButton from '../shared/SharedButton.vue'
import { getArrayByLength } from '../../utils/index'
import { copyDate, getDateParts } from '../../utils/date'

const { locale } = defineProps<{
  locale?: string
}>()

const modelValue = defineModel<Date>({
  required: true
})

const isVisible = defineModel<boolean>('visible')

const months = computed(() => {
  const date = copyDate(modelValue.value)
  const formatter = new Intl.DateTimeFormat(locale, { month: 'long' })

  return getArrayByLength(12).map((_, index) => ({
    index,
    name: formatter.format(date.setMonth(index))
  }))
})

function handleClickMonth(monthIndex: number) {
  const date = copyDate(modelValue.value)

  date.setMonth(monthIndex)
  modelValue.value = date

  isVisible.value = false
}

function isSelectedMonth(monthIndex: number) {
  const { month } = getDateParts(modelValue.value)

  return month === monthIndex + 1
}
</script>

<template>
  <div
    v-if="isVisible"
    class="grid grid-cols-3 gap-3 p-3 bg-white size-full"
  >
    <SharedButton
      v-for="month in months"
      :key="month.index"
      :class="{
        'text-blue-600 bg-blue-100': isSelectedMonth(month.index)
      }"
      class="rounded"
      @click="handleClickMonth(month.index)"
    >
      {{ month.name }}
    </SharedButton>
  </div>
</template>
