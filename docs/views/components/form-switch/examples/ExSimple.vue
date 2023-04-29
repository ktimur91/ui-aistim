<script setup>
import { ref } from 'vue'

// Date
const selected = ref(false)
</script>

<template>
  <UiFormSwitch label="label" v-model="selected" />
  <div class="mt-10">Value: {{ selected }}</div>
</template>
