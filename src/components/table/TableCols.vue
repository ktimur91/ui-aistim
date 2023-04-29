<script setup>
import { toRefs, ref, watch } from 'vue'
import { UiIcon, UiDropdown, UiFormSwitch } from '../index'
import { cloneDeep } from 'lodash'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  defaultValue: {
    type: Array,
    default: () => []
  }
})

// Data
const { modelValue } = toRefs(props)

const columns = ref([])

watch(
  modelValue,
  (val) => {
    columns.value = cloneDeep(val)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <UiDropdown
    :trigger-class="['btn sm grey', { disabled: !columns.length }]"
    position-x="right"
    body-width="auto"
    body-class="grid"
    append-to-body
  >
    <template #trigger>
      <UiIcon icon="settings" color="grey" size="16" />
      Колонки
    </template>

    <!-- Body -->
    <form @submit.prevent="() => emits('update:modelValue', columns)">
      <div class="pl-20 pr-20 pt-15 pb-15">Настройка колонок</div>

      <div v-for="item of columns" :key="item.key" class="grid gtc-1-auto ggap-5 ai-c pl-10 pr-10 pt-5 pb-5">
        <UiFormSwitch :label="item.name" label-class="btn md grey w-100pr pl-10 pr-30" v-model="item.active" />
        <button class="btn grey cube md"><UiIcon icon="drag" color="grey" size="18" /></button>
      </div>

      <div class="grid gtc-2 ai-c ggap-10 p-10">
        <button class="btn md cancel jc-c" type="button" @click="emits('update:modelValue', defaultValue)">
          Сбросить
        </button>
        <button class="btn md primary jc-c" type="submit">Применить</button>
      </div>
    </form>
  </UiDropdown>
</template>
