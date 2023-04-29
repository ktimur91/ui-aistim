<script setup>
import { toRefs, ref, watch } from 'vue'
import { UiFormCheckbox } from '../../index'
import { cloneDeep } from 'lodash'

// Emits
const emits = defineEmits(['focused', 'change', 'reset'])

// Props
const props = defineProps({
  modelValue: {
    type: Array,
    default: null
  },
  componentProps: {
    type: Object,
    default: () => ({})
  }
})

// Data
const { modelValue, componentProps } = toRefs(props)

const list = ref([])
const selected = ref([])
const loading = ref(true)

// Watch
watch(
  modelValue,
  (val) => {
    selected.value = Array.isArray(val) ? cloneDeep(val) : []
  },
  {
    immediate: true
  }
)

// Created
// TODO: надо добавить лоадер в шаблон
componentProps.value
  .getList()
  .then((res) => {
    list.value = res
  })
  .finally(() => {
    loading.value = false
  })
</script>

<template>
  <form class="filter-checklist" @submit.prevent="() => emits('change', selected)">
    <!--    TODO: надо стилизовать шапку-->
    <div class="grid ggap-10 p-10" style="max-height: 300px; overflow: auto">
      <div>Выберите несколько значений</div>
      <UiFormCheckbox
        v-for="(item, index) of list"
        :key="index"
        :label="item.label"
        :default-value="item.value"
        v-model="selected"
      />
    </div>

    <div class="flex ai-c jc-fe ggap-10 p-10">
      <button class="btn md cancel" type="button" @click="() => emits('reset')">Сбросить</button>
      <button class="btn md primary" type="submit">Применить</button>
    </div>
  </form>
</template>
