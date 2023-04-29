<script setup>
import UiIcon from '../icons/UiIcon.vue'

// Props
const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  icon: {
    type: String,
    default: 'info-circle'
  }
})
</script>

<template>
  <div class="base-alert grid ai-fs gtc-auto-1 ggap-10 p-10 box" :class="props.color">
    <div class="base-alert__icon flex">
      <UiIcon size="20" :icon="props.icon" />
    </div>
    <div class="base-alert__message">
      <slot />
    </div>
  </div>
</template>
