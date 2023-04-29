<template>
  <div class="form-radio flex" @click.stop>
    <input
      type="radio"
      :name="'form-radio-' + uid"
      :id="'form-radio-' + uid"
      class="form-radio__input"
      :required="required"
      :value="defaultValue"
      v-model="propValue"
    />
    <label
      :for="'form-radio-' + uid"
      class="form-radio__label ai-c ggap-10"
      :class="label ? 'grid gtc-auto-1' : 'flex'"
    >
      <span class="form-radio__label-check flex ai-c jc-c" />
      <slot>
        <span v-if="label">{{ label }}</span>
      </slot>
    </label>
  </div>
</template>

<script setup>
import { getCurrentInstance, toRefs, computed } from 'vue'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  defaultValue: {
    type: [Boolean, String, Number, Object, Array],
    default: false
  },
  modelValue: {
    type: [Boolean, String, Number, Object, Array],
    default: false
  }
})

// Data
const { label, required, defaultValue, modelValue } = toRefs(props)
const uid = getCurrentInstance().uid

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
</script>
