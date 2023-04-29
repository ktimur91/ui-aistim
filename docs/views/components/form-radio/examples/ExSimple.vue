<script setup>
import { ref } from 'vue'

// Data
const selected = ref('first')
</script>

<template>
  <div class="flex ai-c ggap-30 mb-20">
    <UiFormRadio label="first" default-value="first" v-model="selected" />
    <UiFormRadio label="second" default-value="second" v-model="selected" />
    <UiFormRadio label="third" default-value="third" v-model="selected" />
  </div>

  <div class="mt-10">Value: {{ selected }}</div>
</template>
