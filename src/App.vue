<script setup lang="ts">
import { ref } from 'vue'

import CalendarWrapper from './components/calendar/CalendarWrapper.vue'
import SharedButton from './components/shared/SharedButton.vue'

const locale = ref('ru-RU')
const selectedDate = ref('2025-11-01')
</script>

<template>
  <main class="w-full h-dvh flex p-10 bg-gray-100">
    <div class="flex flex-col gap-5">
      <CalendarWrapper
        v-model="selectedDate"
        :locale
      />

      <p class="flex align-baseline gap-4">
        <span class="flex-auto">
          Выбранная дата:
        </span>

        <span class="font-medium">
          {{ selectedDate }}
        </span>
      </p>

      <p class="flex align-baseline gap-4">
        <span class="flex-auto">
          Выбрать локаль:
        </span>

        <SharedButton
          class="underline"
          @click="locale = 'ru-RU'"
        >
          ru-RU
        </SharedButton>

        <SharedButton
          class="underline"
          @click="locale = 'en-US'"
        >
          en-US
        </SharedButton>
      </p>
    </div>
  </main>
</template>

<style>
@import 'tailwindcss';
</style>
