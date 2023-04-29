<script setup>
import { toRefs, computed } from 'vue'
import UiIcon from '../icons/UiIcon.vue'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  all: {
    type: String,
    default: 'all'
  },
  size: {
    type: String,
    default: 'md'
  },
  modelValue: {
    type: String,
    default: ''
  }
})

// Data
const { all, size, modelValue } = toRefs(props)

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
</script>

<template>
  <button
    type="button"
    class="form-table-checkbox flex ai-c jc-c"
    :class="[propValue, size]"
    @click="propValue = propValue === all ? '' : all"
  >
    <UiIcon v-if="propValue === all" class="form-table-checkbox__icon white" size="16" icon="check" />
    <div v-else-if="propValue !== all && !!propValue" class="form-table-checkbox__cube" />
  </button>
</template>
