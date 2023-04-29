<script setup>
import { getCurrentInstance, defineProps, defineEmits, toRefs, computed, watch, ref, nextTick } from 'vue'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  label: {
    type: String,
    default: 'Label'
  },
  rows: {
    type: String,
    default: '1'
  },
  placeholder: {
    type: String,
    default: 'Placeholder'
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    default: ''
  }
})

// Data
const { label, placeholder, required, modelValue } = toRefs(props)
const uid = getCurrentInstance().uid
const focused = ref(false)
const textareaRef = ref()

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
const isSuccess = computed(() => {
  return !!propValue.value
})

// Watch
watch(modelValue, () => {
  nextTick(() => resizer())
})
// watch(focused, (val) => val && resizer())

// Created
nextTick(() => resizer())

// Methods
function resizer() {
  const el = document.querySelector('#textarea-' + uid)
  if (el) {
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }
}
function setFocus() {
  textareaRef.value.focus()
}

// Expose
defineExpose({
  setFocus
})
</script>

<template>
  <div class="form-item grid" :class="{ required: required, disabled: disabled }" :data-success="isSuccess">
    <label v-if="label" class="form-item__label">
      {{ label }}
    </label>

    <div class="textarea form-item__input grid pl-10 pr-10" :class="focused && 'focused'" @click.prevent="setFocus">
      <textarea
        ref="textareaRef"
        :name="'form-item-' + uid"
        :id="'textarea-' + uid"
        cols="30"
        :rows="rows"
        class="textarea__input"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        v-model="propValue"
        @focus="focused = true"
        @blur="focused = false"
      />
    </div>
  </div>
</template>
