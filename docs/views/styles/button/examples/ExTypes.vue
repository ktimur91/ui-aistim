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
    <button class="btn primary" :class="[currentTab, { rounded: isRounded }]">Primary</button>
    <button class="btn secondary" :class="[currentTab, { rounded: isRounded }]">Secondary</button>
    <button class="btn outline" :class="[currentTab, { rounded: isRounded }]">Outline</button>
    <button class="btn link" :class="[currentTab, { rounded: isRounded }]">Link</button>
    <button class="btn cancel" :class="[currentTab, { rounded: isRounded }]">Cancel</button>
    <button class="btn grey" :class="[currentTab, { rounded: isRounded }]">Grey</button>
    <button class="btn green" :class="[currentTab, { rounded: isRounded }]">Green</button>
    <button class="btn red" :class="[currentTab, { rounded: isRounded }]">Red</button>
    <button class="btn yellow" :class="[currentTab, { rounded: isRounded }]">Yellow</button>
    <button class="btn primary" :class="[currentTab, { rounded: isRounded }]" disabled>Disabled</button>
  </div>

  <hr class="mt-30 mb-30" />

  <div class="flex ai-c fw ggap-10">
    <button class="btn primary cube" :class="[currentTab, { rounded: isRounded }]">cube</button>
    <button class="btn secondary cube" :class="[currentTab, { rounded: isRounded }]">
      <UiIcon icon="calendar" size="20" />
    </button>
    <button class="btn outline" :class="[currentTab, { rounded: isRounded }]">
      <UiIcon icon="calendar" size="20" /> Outline
    </button>
    <button class="btn link" :class="[currentTab, { rounded: isRounded }]">
      <UiIcon icon="calendar" size="20" /> Link
    </button>
    <button class="btn cancel" :class="[currentTab, { rounded: isRounded }]">
      <UiIcon icon="calendar" size="20" /> Cancel
    </button>
    <button class="btn grey" :class="[currentTab, { rounded: isRounded }]">
      <UiIcon icon="calendar" size="20" /> Grey
    </button>
    <button class="btn green" :class="[currentTab, { rounded: isRounded }]">
      <UiIcon icon="calendar" size="20" /> Green
    </button>
    <button class="btn red" :class="[currentTab, { rounded: isRounded }]">
      <UiIcon icon="calendar" size="20" /> Red
    </button>
    <button class="btn yellow" :class="[currentTab, { rounded: isRounded }]">
      <UiIcon icon="calendar" size="20" /> Yellow
    </button>
    <button class="btn primary" :class="[currentTab, { rounded: isRounded }]" disabled>
      <UiIcon icon="calendar" size="20" /> Disabled
    </button>
  </div>
</template>
