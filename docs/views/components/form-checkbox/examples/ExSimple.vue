<script setup>
import { ref } from 'vue'

// Data
const selected = ref(false)
const selectedList = ref([])
</script>

<template>
  <div class="grid ggap-30">
    <section class="grid ggap-10">
      <UiFormCheckbox label="label" v-model="selected" />
      <div class="mt-10">Value: {{ selected }}</div>
    </section>

    <section class="grid ggap-10">
      <UiFormCheckbox label="Атырау" default-value="Атырау" v-model="selectedList" />
      <UiFormCheckbox label="Актау" default-value="Актау" v-model="selectedList" />
      <UiFormCheckbox label="Уральск" default-value="Уральск" v-model="selectedList" />
      <div class="mt-10">Value: {{ selectedList }}</div>
    </section>
  </div>
</template>
