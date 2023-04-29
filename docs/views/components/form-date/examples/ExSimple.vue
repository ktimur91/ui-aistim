<template>
  <UiFormDate
    label="Date"
    append-to-body
    placeholder="Select date"
    format="YYYY-MM-DD"
    value-type="format"
    v-model="date"
  />
  <div class="mt-10">Value: {{ date }}</div>
</template>
<script setup>
import { ref } from 'vue'

const date = ref()
</script>
