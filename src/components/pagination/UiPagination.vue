<script setup>
import { computed, toRefs, watch } from 'vue'
import { UiIcon, UiFormSelect } from '../index'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      current: 1,
      perPage: 25
    })
  },
  total: {
    type: Number,
    required: true
  },
  pageOptions: {
    type: Array,
    default: () => [
      { value: 25, text: '25' },
      { value: 50, text: '50' },
      { value: 100, text: '100' }
    ]
  },
  appendToBody: {
    type: Boolean,
    default: false
  },
  positionY: {
    type: String,
    default: 'auto'
  }
})

// Data
const { modelValue, total, pageOptions } = toRefs(props)

const beforeCurrent = 1
const afterCurrent = 1

// Computed
const perPageObject = computed({
  get: () => ({ value: modelValue.value.perPage, text: modelValue.value.perPage }),
  set: (val) => emits('update:modelValue', { ...modelValue.value, current: 1, perPage: val.value })
})

const pageCount = computed(() => Math.ceil(total.value / modelValue.value.perPage))

const hasPrev = computed(() => modelValue.value.current > 1)

const hasFirst = computed(() => modelValue.value.current >= 2 + beforeCurrent)

const hasFirstEllipsis = computed(() => modelValue.value.current >= beforeCurrent + 4)

const hasLast = computed(() => modelValue.value.current <= pageCount.value - (1 + afterCurrent))

const hasLastEllipsis = computed(() => modelValue.value.current < pageCount.value - (2 + afterCurrent))

const hasNext = computed(() => modelValue.value.current < pageCount.value)

const pagesInRange = computed(() => {
  let left = Math.max(1, modelValue.value.current - beforeCurrent)
  if (left - 1 === 2) {
    left--
  }
  let right = Math.min(modelValue.value.current + afterCurrent, pageCount.value)
  if (pageCount.value - right === 2) {
    right++
  }

  const pages = []
  for (let i = left; i <= right; i++) {
    pages.push({
      number: i,
      isCurrent: modelValue.value.current === i,
      click: () => changePage(i)
    })
  }
  return pages
})

// Watch
watch(pageCount, (value) => {
  if (modelValue.value.current > value) last()
})

// Methods
function last() {
  changePage(pageCount.value)
}

function prev() {
  changePage(modelValue.value.current - 1)
}

function next() {
  changePage(modelValue.value.current + 1)
}

function first() {
  changePage(1)
}

function changePage(num) {
  if (modelValue.value.current === num || num < 1 || num > pageCount.value) return

  emits('update:modelValue', { ...modelValue.value, current: num })
}
</script>

<template>
  <div class="flex ai-c jc-sb ggap-50">
    <div class="flex ai-c ggap-10">
      <UiFormSelect
        v-model="perPageObject"
        :items="pageOptions"
        positionY="top"
        size="sm"
        :append-to-body="appendToBody"
        :position-y="positionY"
      />
      из
      <span>{{ total }}</span>
    </div>

    <div class="flex ai-c ggap-10">
      <!--First-->
      <button class="btn sm outline" :disabled="!hasPrev" @click="prev()">
        <UiIcon icon="arrow-left" color="grey" size="16" />
      </button>

      <button v-if="hasFirst" class="btn sm outline" @click="first()">1</button>

      <span v-if="hasFirstEllipsis">...</span>

      <!--Pages-->
      <button
        v-for="page in pagesInRange"
        :key="page.number"
        class="btn sm outline"
        :class="{ active: page.isCurrent }"
        @click="page.click"
      >
        {{ page.number }}
      </button>

      <!--Last-->
      <span v-if="hasLastEllipsis">...</span>

      <button v-if="hasLast" class="btn sm outline" @click="last()">{{ pageCount }}</button>

      <button class="btn sm outline" :disabled="!hasNext" @click="next()">
        <UiIcon icon="arrow-right" color="grey" size="16" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
