<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'

// Data
const currentTab = ref('first')
const items = [
  {
    text: 'First tab',
    value: 'first',
    icon: 'info-circle',
    iconPack: 'solid'
  },
  {
    text: 'Second tab',
    value: 'second',
    icon: 'info-circle',
    counter: 22
  },
  {
    text: 'Third tab',
    value: 'third',
    icon: 'calendar'
  },
  {
    text: 'Four tab',
    value: 'four',
    icon: 'trash'
  }
]
const itemsLinks = [
  {
    text: 'First link',
    link: '/tabs',
    append: false,
    icon: 'bell'
  },
  {
    text: 'Second link',
    link: '/tabs/second',
    append: false,
    icon: 'link'
  }
]
</script>

<template>
  <section class="grid ggap-30">
    <UiTabButtons v-model="currentTab" :items="items" />
    <UiTabSwipe v-model="currentTab" :items="items" />

    <!-- Links -->
    <UiTabSwipeLinks :items="itemsLinks" />
    <RouterView />
  </section>
</template>
