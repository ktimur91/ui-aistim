<script setup>
import { toRefs } from 'vue'

// Props
const props = defineProps({
  isTrue: {
    type: Boolean,
    default: false
  }
})

// Data
const { isTrue } = toRefs(props)
</script>

<template>
  <div class="form-fake-switch" :class="{ active: isTrue }">&nbsp;</div>
</template>
