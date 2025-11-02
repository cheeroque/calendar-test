<script setup lang="ts">
import { computed } from 'vue'

import CalendarMonthPicker from './CalendarMonthPicker.vue'
import CalendarYearPicker from './CalendarYearPicker.vue'
import SharedTransition from '../shared/SharedTransition.vue'

const { locale } = defineProps<{
  locale?: string
}>()

const modelValue = defineModel<Date>({
  required: true
})

const pickerModel = defineModel<'month' | 'year'>('picker')

const monthPickerVisible = computed({
  get: () => pickerModel.value === 'month',
  set: (isVisible) => {
    pickerModel.value = isVisible ? 'month' : undefined
  }
})

const yearPickerVisible = computed({
  get: () => pickerModel.value === 'year',
  set: (isVisible) => {
    pickerModel.value = isVisible ? 'year' : undefined
  }
})
</script>

<template>
  <SharedTransition :model-value="!!pickerModel">
    <div class="absolute inset-x-0 top-14 bottom-0 bg-white z-10">
      <CalendarMonthPicker
        v-model="modelValue"
        v-model:visible="monthPickerVisible"
        :locale
        class="h-full"
      />

      <CalendarYearPicker
        v-model="modelValue"
        v-model:visible="yearPickerVisible"
        class="h-full"
      />
    </div>
  </SharedTransition>
</template>
