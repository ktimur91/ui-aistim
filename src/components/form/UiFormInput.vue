<script setup>
import { MaskInput } from 'vue-3-mask'
import { getCurrentInstance, toRefs, computed, ref } from 'vue'
import UiIcon from '../icons/UiIcon.vue'

// Emits
const emits = defineEmits(['update:modelValue', 'focused'])

// Props
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  hasMask: {
    type: Boolean,
    default: false
  },
  mask: {
    type: String,
    default: '+7 (###) ###-##-##'
  },
  size: {
    type: String,
    default: 'md'
  },
  placeholder: {
    type: String,
    default: 'placeholder'
  },
  autocomplete: {
    type: String,
    default: 'on'
  },
  minlength: {
    type: [Number, String],
    default: 0
  },
  maxlength: {
    type: [Number, String],
    default: 0
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
  modelValue: {
    type: [String, Number],
    default: ''
  }
})

// Data
const { label, type, placeholder, hasMask, mask, required, minlength, maxlength, modelValue } = toRefs(props)
const uid = getCurrentInstance().uid
const currentType = ref(props.type)
const inputRef = ref()

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
const isSuccess = computed(() => {
  let res = false
  if (propValue.value) {
    res =
      maxlength.value || minlength.value
        ? propValue.value.length <= maxlength.value && propValue.value.length >= minlength.value
        : !!propValue.value
  }
  return res
})

// Methods
function setCurrentType() {
  currentType.value = currentType.value === 'password' ? 'text' : 'password'
}
function setFocus() {
  inputRef.value.focus()
}
function checkLength(e) {
  propValue.value = e.target.value
}

// Expose
defineExpose({
  setFocus
})
</script>

<template>
  <div
    class="form-item grid"
    :class="[{ required: required, disabled: disabled, error: isError }, size]"
    :data-success="isSuccess"
  >
    <div v-if="label" class="flex ai-c jc-sb">
      <label class="form-item__label">
        {{ label }}
      </label>
      <small v-if="maxlength" class="fs-12">
        <b :class="{ 't-red': String(propValue.length) > maxlength }">{{ String(propValue.length) }}</b
        >/{{ maxlength }}
      </small>
    </div>

    <MaskInput
      v-if="hasMask"
      ref="inputRef"
      class="form-item__input w-100pr"
      :type="currentType"
      :name="'form-item-' + uid"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="required"
      :disabled="disabled"
      :mask="mask"
      @input="checkLength"
      v-model="propValue"
    />
    <div v-else class="pos-r">
      <input
        v-if="type !== 'number' && (maxlength || minlength)"
        ref="inputRef"
        :type="currentType"
        :name="'form-item-' + uid"
        class="form-item__input w-100pr"
        :class="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :minlength="minlength"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        v-model="propValue"
        @focus="emits('focused')"
      />
      <input
        v-else-if="type === 'number' && (maxlength || minlength)"
        ref="inputRef"
        :type="currentType"
        :name="'form-item-' + uid"
        class="form-item__input w-100pr"
        :class="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :min="minlength"
        :max="maxlength"
        :autocomplete="autocomplete"
        v-model="propValue"
        @focus="emits('focused')"
      />
      <input
        v-else
        ref="inputRef"
        :type="currentType"
        :name="'form-item-' + uid"
        class="form-item__input w-100pr"
        :class="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :autocomplete="autocomplete"
        v-model="propValue"
        @focus="emits('focused')"
      />

      <button
        v-if="type === 'password'"
        class="toggle-password btn pos-a jc-c"
        type="button"
        @click.prevent="setCurrentType"
      >
        <UiIcon size="16" :icon="currentType === 'password' ? 'eye-off' : 'eye'" />
      </button>
      <div v-if="type === 'search'" class="search-icon pos-a flex ai-c jc-c" @click="setFocus">
        <UiIcon size="16" icon="search" class="grey" />
      </div>
    </div>
  </div>
</template>
