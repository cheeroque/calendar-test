<script setup lang="ts">
import { computed, defineModel, defineProps, ref } from 'vue'

import { copyDate } from '../../utils/date'
import CalendarPeriodPicker from './CalendarPeriodPicker.vue'
import SharedButton from '../shared/SharedButton.vue'
import SharedIcon from '../shared/SharedIcon.vue'

const { locale } = defineProps<{
  locale?: string
}>()

const modelValue = defineModel<Date>({
  required: true
})

const monthName = computed(() => new Intl.DateTimeFormat(locale, { month: 'short' }).format(modelValue.value))
const year = computed(() => modelValue.value.getFullYear())

function decrementMonth() {
  const date = copyDate(modelValue.value)

  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  if (!monthIndex) {
    date.setFullYear(year - 1)
  }

  date.setMonth(monthIndex ? monthIndex - 1 : 11)

  modelValue.value = date
}

function incrementMonth() {
  const date = copyDate(modelValue.value)

  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  const isLastMonth = monthIndex >= 11

  date.setMonth(isLastMonth ? 0 : monthIndex + 1)

  if (isLastMonth) {
    date.setFullYear(year + 1)
  }

  modelValue.value = date
}

const pickerMode = ref<'month' | 'year'>()

function togglePicker(mode: typeof pickerMode.value) {
  if (pickerMode.value === mode) {
    pickerMode.value = undefined
  } else {
    pickerMode.value = mode
  }
}
</script>

<template>
  <div class="flex items-center py-1">
    <SharedButton
      :disabled="!!pickerMode"
      class="size-5 flex-none text-xl"
      @click="decrementMonth"
    >
      <SharedIcon icon="ri:arrow-left-s-fill" />
    </SharedButton>

    <div class="flex flex-auto justify-center gap-2 text-center">
      <SharedButton @click="togglePicker('month')">
        {{ monthName }}
      </SharedButton>

      <SharedButton @click="togglePicker('year')">
        {{ year }}
      </SharedButton>
    </div>

    <SharedButton
      :disabled="!!pickerMode"
      class="size-5 flex-none text-xl"
      @click="incrementMonth"
    >
      <SharedIcon icon="ri:arrow-right-s-fill" />
    </SharedButton>

    <CalendarPeriodPicker
      v-model="modelValue"
      v-model:picker="pickerMode"
      :locale
    />
  </div>
</template>
