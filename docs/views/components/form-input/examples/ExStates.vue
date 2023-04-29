<script setup>
import { ref } from 'vue'

// Data
const formData = ref({
  disabled: 'Disabled text'
})
</script>

<template>
  <section class="grid ggap-20">
    <UiFormInput v-model="formData.error" label="is-error" placeholder="is-error" is-error />
    <UiFormInput v-model="formData.maxlength" label="input with max length" placeholder="max length" :maxlength="20" />
    <UiFormInput label="disabled" placeholder="disabled" v-model="formData.disabled" disabled />
    <UiFormTextarea label="disabled" placeholder="disabled" v-model="formData.disabled" />
  </section>
</template>
