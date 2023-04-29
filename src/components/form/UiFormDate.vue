<script setup>
// DOCS - https://mengxiong10.github.io/vue-datepicker-next/index.html
import DatePicker from 'vue-datepicker-next'
import 'vue-datepicker-next/locale/ru.es'
// import 'vue-datepicker-next/index.css'
import { toRefs, computed } from 'vue'

// Emits
const emits = defineEmits(['update:modelValue', 'change'])

// Props
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Выберите дату'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  range: {
    type: Boolean,
    default: false
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  valueType: {
    type: String,
    default: 'date'
  },
  appendToBody: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number, Array, Date],
    default: ''
  }
})

// Data
const { label, placeholder, disabled, required, range, format, valueType, appendToBody, modelValue } = toRefs(props)

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
const isSuccess = computed(() => !!propValue.value?.length)
</script>

<template>
  <div class="form-item grid" :class="{ required: required, disabled: disabled }" :data-success="isSuccess">
    <label v-if="label" class="form-item__label">
      {{ label }}
    </label>
    <DatePicker
      :range="range"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :format="format"
      :value-type="valueType"
      :append-to-body="appendToBody"
      lang="ru"
      v-model:value="propValue"
      @change="emits('change')"
    />
  </div>
</template>
