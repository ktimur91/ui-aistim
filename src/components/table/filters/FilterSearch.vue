<script setup>
import { toRefs, ref, watch } from 'vue'
import { UiFormInput } from '../../index'

// Emits
const emits = defineEmits(['focused', 'change', 'reset'])

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  componentProps: {
    type: Object,
    default: () => ({})
  }
})

const { modelValue, componentProps } = toRefs(props)

const searchTerm = ref()
const searchResults = ref([])

watch(
  modelValue,
  (val) => {
    searchTerm.value = val
  },
  {
    immediate: true
  }
)

watch(
  searchTerm,
  (val) => {
    componentProps.value.getSearchResults(val, (arr) => {
      searchResults.value = arr
    })
  },
  {
    immediate: true
  }
)
</script>

<template>
  <form class="filter-search" @submit.prevent="() => emits('change', searchTerm)">
    <div class="grid ggap-10 p-10">
      <UiFormInput type="search" v-model.trim="searchTerm" placeholder="Начните вводить" />
      <div class="flex ai-c fw ggap-5" v-if="searchResults.length">
        <button
          v-for="(result, index) of searchResults"
          :key="index"
          class="btn sm base"
          type="button"
          @click.prevent="searchTerm = result"
        >
          {{ result }}
        </button>
      </div>
    </div>

    <div class="flex ai-c jc-fe ggap-10 p-10">
      <button class="btn md cancel" type="button" @click="() => emits('reset')">Сбросить</button>
      <button class="btn md primary" type="submit">Применить</button>
    </div>
  </form>
</template>
