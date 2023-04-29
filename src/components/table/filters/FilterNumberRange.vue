<script setup>
import { toRefs, ref, watch } from 'vue'
import { UiFormInput } from '../../index'
import { cloneDeep } from 'lodash'

// Emits
const emits = defineEmits(['focused', 'change', 'reset'])

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  componentProps: {
    type: Object,
    default: () => ({})
  }
})

const { modelValue } = toRefs(props)

const searchNumbers = ref({})

watch(
  modelValue,
  (val) => {
    searchNumbers.value = cloneDeep(val)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <form class="filter-search" @submit.prevent="() => emits('change', searchNumbers)">
    <div class="grid ggap-10 p-10">
      <div>От</div>
      <UiFormInput type="number" v-model.number="searchNumbers.from" placeholder="Начните вводить" required />
      <div>До</div>
      <UiFormInput type="number" v-model.number="searchNumbers.to" placeholder="Начните вводить" required />
    </div>

    <div class="flex ai-c jc-fe ggap-10 p-10">
      <button class="btn md cancel" type="button" @click="() => emits('reset')">Сбросить</button>
      <button class="btn md primary" type="submit">Применить</button>
    </div>
  </form>
</template>
