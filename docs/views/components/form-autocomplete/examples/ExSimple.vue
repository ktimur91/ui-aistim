<script setup>
import { ref } from 'vue'

// Data
const selectedItem = ref(null)
const selectedItems = ref([])
const items = [
  {
    text: 'Алмата',
    value: 1
  },
  {
    text: 'Астана',
    value: 2
  },
  {
    text: 'Уральск',
    value: 3
  },
  {
    text: 'Атырау',
    value: 4
  },
  {
    text: 'Актау',
    value: 5
  }
]
const currentTab = ref('md')
const tabs = [
  {
    text: 'sm',
    value: 'sm'
  },
  {
    text: 'md',
    value: 'md'
  },
  {
    text: 'lg',
    value: 'lg'
  }
]
</script>

<template>
  <UiTabButtons v-model="currentTab" :items="tabs" class="mb-30" />

  <div class="grid gtc-2 ggap-20 mb-30">
    <UiFormAutocomplete
      label="Some label for autocomplete"
      :size="currentTab"
      :items="items"
      v-model="selectedItem"
      required
    />
    <UiFormAutocomplete label="Not required" :size="currentTab" :items="items" v-model="selectedItem" />
    <UiFormAutocomplete label="is-error" :size="currentTab" :items="items" v-model="selectedItem" is-error />
    <UiFormAutocomplete label="disabled" :size="currentTab" :items="items" v-model="selectedItem" disabled />
  </div>

  <UiFormAutocomplete
    label="Multiselect autocomplete"
    is-multiselect
    :size="currentTab"
    :items="items"
    v-model="selectedItems"
    required
  />
</template>
