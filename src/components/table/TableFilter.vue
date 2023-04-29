<script setup>
import { computed, markRaw, ref, toRefs } from 'vue'
import { UiIcon, UiDropdown } from '../index'
import FilterDate from './filters/FilterDate.vue'
import FilterNumber from './filters/FilterNumber.vue'
import FilterNumberRange from './filters/FilterNumberRange.vue'
import FilterSearch from './filters/FilterSearch.vue'
import FilterChecklist from './filters/FilterChecklist.vue'

const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  filters: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

// Data
const filterDdown = ref()
const activeFilters = ref([])
const currentComponent = ref({
  Date: markRaw(FilterDate),
  Number: markRaw(FilterNumber),
  NumberRange: markRaw(FilterNumberRange),
  Search: markRaw(FilterSearch),
  Checklist: markRaw(FilterChecklist)
})
const { modelValue } = toRefs(props)

// Computed
const filters = computed(() =>
  activeFilters.value?.length
    ? props.filters.filter((el) => !activeFilters.value.find((a) => a.key === el.key))
    : props.filters
)

// Methods
function setFilter(filter) {
  activeFilters.value.push(filter)
  filterDdown.value.closeAction()
}
function removeFilter(filter) {
  const index = activeFilters.value.findIndex((el) => el.key === filter.key)
  if (index !== -1) activeFilters.value.splice(index, 1)
  resetAction(filter)
}
function submitAction(option, val) {
  const tmpModelValue = { ...modelValue.value, [option.key]: val }

  if (option.component === 'Search' && !val) {
    delete tmpModelValue[option.key]
  }
  if (option.component === 'Number' && typeof val !== 'number') {
    delete tmpModelValue[option.key]
  }
  if (option.component === 'Date' && (!val || (Array.isArray(val) && !val[0] && !val[1]))) {
    delete tmpModelValue[option.key]
  }
  if (option.component === 'Checklist' && !val?.length) {
    delete tmpModelValue[option.key]
  }

  emits('update:modelValue', tmpModelValue)
}
function resetAction(option) {
  const tmpModelValue = { ...modelValue.value }

  delete tmpModelValue[option.key]

  emits('update:modelValue', tmpModelValue)
}
</script>

<template>
  <div class="flex ai-c ggap-5">
    <div v-for="activeFilter of activeFilters" :key="activeFilter.key" class="btn-group flex ai-c">
      <UiDropdown
        :trigger-class="[
          'btn sm btn-group__first f-1',
          { base: !activeFilter.value, secondary: modelValue[activeFilter.key] }
        ]"
        position-x="left"
        body-width="auto"
        body-class="base-table__filter"
        append-to-body
      >
        <template #trigger>
          {{ activeFilter.name }}
        </template>

        <!-- Body -->
        <component
          :is="currentComponent[activeFilter.component]"
          :component-props="activeFilter.componentProps"
          :model-value="modelValue[activeFilter.key]"
          @change="submitAction(activeFilter, $event)"
          @reset="resetAction(activeFilter)"
        />
      </UiDropdown>
      <button class="btn outline sm cube btn-group__last" type="button" @click.prevent="removeFilter(activeFilter)">
        <UiIcon icon="close" color="grey" size="16" />
      </button>
    </div>
  </div>

  <UiDropdown
    ref="filterDdown"
    :trigger-class="['btn sm grey', { disabled: !filters.length }]"
    position-x="right"
    body-width="auto"
    body-class="p-5 grid ggap-5"
    append-to-body
  >
    <template #trigger>
      <UiIcon icon="filter" color="grey" size="16" />
      Фильтры
    </template>

    <!-- Body -->
    <button v-for="filter of filters" :key="filter.key" class="btn link sm" @click="setFilter(filter)">
      {{ filter.name }}
    </button>
  </UiDropdown>
</template>
