<script setup>
import { getCurrentInstance, toRefs, computed } from 'vue'
import UiIcon from '../icons/UiIcon.vue'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md'
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
const { label, size, required, defaultValue, modelValue } = toRefs(props)
const uid = getCurrentInstance().uid

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
</script>

<template>
  <div class="form-checkbox flex" :class="size" @click.stop>
    <input
      type="checkbox"
      :name="'form-checkbox-' + uid"
      :id="'form-checkbox-' + uid"
      class="form-checkbox__input"
      :required="required"
      :value="defaultValue"
      v-model="propValue"
    />
    <label
      :for="'form-checkbox-' + uid"
      class="form-checkbox__label ai-c ggap-10"
      :class="label ? 'grid gtc-auto-1' : 'flex'"
    >
      <span class="form-checkbox__label-check flex ai-c jc-c">
        <UiIcon class="white" size="16" icon="check" />
      </span>
      <slot>
        <span v-if="label">{{ label }}</span>
      </slot>
    </label>
  </div>
</template>
