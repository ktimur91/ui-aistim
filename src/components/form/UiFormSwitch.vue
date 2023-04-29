<script setup>
import { getCurrentInstance, toRefs, computed } from 'vue'
// import UiIcon from '../icons/UiIcon.vue'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  labelClass: {
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
    type: Boolean,
    default: false
  }
})

// Data
const { label, labelClass, required, defaultValue, modelValue } = toRefs(props)
const uid = getCurrentInstance().uid

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
</script>

<template>
  <div class="form-switch flex" @click.stop>
    <input
      type="checkbox"
      :name="'form-switch-' + uid"
      :id="'form-switch-' + uid"
      class="form-switch__input"
      :required="required"
      :value="defaultValue"
      v-model="propValue"
    />
    <label
      :for="'form-switch-' + uid"
      class="form-switch__label ai-c ggap-10"
      :class="[{ 'grid gtc-auto-1': label, flex: !label }, labelClass]"
    >
      <span class="form-switch__label-switch flex ai-c jc-c" :class="{ active: propValue }" />
      <slot>
        <span v-if="label" class="form-switch__label-text" :class="{ active: propValue }">{{ label }}</span>
      </slot>
    </label>
  </div>
</template>
