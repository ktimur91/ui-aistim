<script setup>
import { toRefs, ref, watch, computed } from 'vue'
import { UiFormDate } from '../../index'

// Emits
const emits = defineEmits(['focused', 'change', 'reset'])

// Props
const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: undefined
  },
  componentProps: {
    type: Object,
    default: () => ({})
  }
})

// Data
const { modelValue, componentProps } = toRefs(props)

const date = ref()

// Computed
const label = computed(() => componentProps.value?.label || 'Дата')
const range = computed(() => !!componentProps.value?.range)
const appendToBody = computed(() => !!componentProps.value?.appendToBody)
const placeholder = computed(() => componentProps.value?.placeholder || 'Выберите дату')
const format = computed(() => componentProps.value?.format || 'YYYY-MM-DD')
const valueType = computed(() => componentProps.value?.valueType || 'format')

// Watch
watch(
  modelValue,
  (val) => {
    date.value = val
  },
  {
    immediate: true
  }
)
</script>

<template>
  <form class="filter-search" @submit.prevent="() => emits('change', date)">
    <div class="grid ggap-10 p-10">
      <UiFormDate
        :label="label"
        :range="range"
        :append-to-body="appendToBody"
        :placeholder="placeholder"
        :format="format"
        :value-type="valueType"
        v-model="date"
      />
    </div>

    <div class="flex ai-c jc-fe ggap-10 p-10">
      <button class="btn md cancel" type="button" @click="() => emits('reset')">Сбросить</button>
      <button class="btn md primary" type="submit">Применить</button>
    </div>
  </form>
</template>
