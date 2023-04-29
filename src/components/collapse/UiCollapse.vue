<script setup>
import { ref, toRefs, watch } from 'vue'

// Emits
const emits = defineEmits(['opened'])

// Props
const props = defineProps({
  triggerType: {
    type: String,
    default: 'button'
  },
  triggerClass: {
    type: String,
    default: 'btn md outline'
  },
  bodyClass: {
    type: String,
    default: 'p-5'
  },
  positionY: {
    type: String,
    default: 'bottom',
    validator(value) {
      return ['top', 'bottom'].includes(value)
    }
  }
})

// Data
const { triggerClass, bodyClass, positionY } = toRefs(props)
const isOpen = ref(false)

// Watch
watch(isOpen, (val) => {
  emits('opened', val)
})

async function toggleAction() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="pos-r">
    <div v-if="positionY === 'top' && isOpen" class="box" :class="bodyClass">
      <slot />
    </div>

    <component
      :is="triggerType"
      class="w-100pr"
      :class="[triggerClass, { active: isOpen }]"
      @click.prevent="toggleAction"
    >
      <slot name="trigger" :active="isOpen" />
    </component>

    <div v-if="positionY === 'bottom' && isOpen" class="box" :class="bodyClass">
      <slot />
    </div>
  </div>
</template>
