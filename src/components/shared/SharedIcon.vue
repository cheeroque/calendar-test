<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { defineProps } from 'vue'

defineProps<{
  icon: string
}>()
</script>

<template>
  <Icon :icon />
</template>
