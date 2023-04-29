<script setup>
import { ref } from 'vue'

// Data
const isRounded = ref(false)
const currentTab = ref('md')
const items = [
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
const colors = [
  'primary',
  'primary-light',
  'secondary',
  'white',
  'white-box',
  'yellow',
  'yellow-light',
  'green',
  'green-light',
  'red',
  'red-light',
  'grey',
  'grey-dark'
]
</script>

<template>
  <div class="flex ai-c jc-sb mb-30">
    <UiTabButtons v-model="currentTab" :items="items" />
    <button class="btn link" @click="isRounded = !isRounded">
      <UiFormFakeSwitch :isTrue="isRounded" />
      Rounded
    </button>
  </div>

  <div class="flex ai-c fw ggap-10">
    <small class="tag" :class="[currentTab, { rounded: isRounded }]">Base</small>
    <small v-for="color of colors" :key="color" class="tag" :class="[color, currentTab, { rounded: isRounded }]">
      {{ color }}
    </small>
  </div>
</template>
