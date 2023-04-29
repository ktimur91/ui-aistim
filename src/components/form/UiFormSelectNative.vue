<script setup>
import { getCurrentInstance, toRefs, computed } from 'vue'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  label: {
    type: String,
    default: 'Label'
  },
  placeholder: {
    type: String,
    default: 'Выберите'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  isError: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [String, Number, Object],
    default: ''
  }
})

const uid = getCurrentInstance().uid
const { label, placeholder, required, options, modelValue } = toRefs(props)

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
</script>

<template>
  <div class="form-item grid" :class="{ required: required, disabled: disabled, error: isError }">
    <label v-if="label" class="form-item__label">
      {{ label }}
    </label>
    <select
      :name="'form-item-' + uid"
      class="form-item__select w-100"
      :required="required"
      :disabled="disabled"
      v-model="propValue"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="option of options" :key="option.value" :value="option.value" :disabled="option.disabled">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
