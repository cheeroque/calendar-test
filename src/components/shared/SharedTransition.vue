<script setup lang="ts">
import { defineModel } from 'vue'

const modelValue = defineModel<boolean>()
</script>

<template>
  <Transition
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    class="transition-opacity"
  >
    <div v-if="modelValue">
      <slot />
    </div>
  </Transition>
</template>
