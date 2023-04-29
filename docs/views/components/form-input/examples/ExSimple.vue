<script setup>
import { ref } from 'vue'

// Data
const text = ref('')
</script>

<template>
  <UiFormInput v-model="text" />
  <div class="mt-10">Value: {{ text || 'Пусто' }}</div>
</template>
