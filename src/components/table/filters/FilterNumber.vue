<script setup>
import { toRefs, ref, watch } from 'vue'
import { UiFormInput } from '../../index'

// Emits
const emits = defineEmits(['focused', 'change', 'reset'])

// Props
const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined
  },
  componentProps: {
    type: Object,
    default: () => ({})
  }
})

const { modelValue } = toRefs(props)

const searchNumber = ref()

watch(
  modelValue,
  (val) => {
    searchNumber.value = val
  },
  {
    immediate: true
  }
)
</script>

<template>
  <form class="filter-search" @submit.prevent="() => emits('change', searchNumber)">
    <div class="grid ggap-10 p-10">
      <UiFormInput type="number" v-model.number="searchNumber" placeholder="Начните вводить" />
    </div>

    <div class="flex ai-c jc-fe ggap-10 p-10">
      <button class="btn md cancel" type="button" @click="() => emits('reset')">Сбросить</button>
      <button class="btn md primary" type="submit">Применить</button>
    </div>
  </form>
</template>
