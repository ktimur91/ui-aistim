<script setup>
import { toRefs, computed } from 'vue'
import UiIcon from '../icons/UiIcon.vue'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps(['items', 'modelValue'])

// Data
const { items, modelValue } = toRefs(props)

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
</script>

<template>
  <div class="tab-swipe flex ggap-20">
    <slot name="start" />

    <button
      v-for="item of items"
      :key="item.value"
      type="button"
      class="tab-swipe__item"
      :class="{ active: propValue === item.value }"
      @click="propValue = item.value"
    >
      <slot name="item" :item="item">
        <UiIcon v-if="item.icon" size="16" :icon="item.icon" :pack="item.iconPack || 'outline'" />
        {{ item.text }}
        <small v-if="item.counter" class="tag sm rounded primary">{{ item.counter }}</small>
      </slot>
    </button>

    <slot name="end" />
  </div>
</template>
