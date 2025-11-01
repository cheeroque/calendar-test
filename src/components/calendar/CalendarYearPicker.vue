<script setup lang="ts">
import { computed, defineModel } from 'vue'

import SharedButton from '../shared/SharedButton.vue'
import { getArrayByLength } from '../../utils/index'
import { copyDate, getDateParts } from '../../utils/date'

const modelValue = defineModel<Date>({
  required: true
})

const isVisible = defineModel<boolean>('visible')

const selectedYear = computed(() => getDateParts(modelValue.value).year)

const years = computed(() => {
  const decadeStart = Math.floor(selectedYear.value / 10) * 10

  return getArrayByLength(12).map((_, index) => decadeStart + index - 1)
})

function handleClickYear(year: number) {
  const date = copyDate(modelValue.value)

  date.setFullYear(year)
  modelValue.value = date

  isVisible.value = false
}
</script>

<template>
  <div v-if="isVisible" class="grid grid-cols-3 gap-3 p-3 size-full">
    <SharedButton
      v-for="year in years"
      :key="year"
      :class="{
        'text-blue-600 bg-blue-100': selectedYear === year
      }"
      class="rounded first:opacity-50 last:opacity-50"
      @click="handleClickYear(year)"
    >
      {{ year }}
    </SharedButton>
  </div>
</template>
