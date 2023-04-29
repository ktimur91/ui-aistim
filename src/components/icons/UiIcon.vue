<script setup>
import { computed, defineAsyncComponent } from 'vue'

// Props
const props = defineProps({
  pack: {
    type: String,
    default: 'outline'
  },
  icon: {
    type: String,
    default: ''
  },
  size: {
    type: [Number, String],
    default: 24
  },
  color: {
    type: String,
    default: ''
  }
})

// Computed
const currentIcon = computed(() =>
  props.icon ? defineAsyncComponent(() => import(`./${props.pack}/${props.icon}.vue`)) : ''
)
</script>

<template>
  <component :is="currentIcon" :width="props.size" :height="props.size" class="icon" :class="color" />
</template>
