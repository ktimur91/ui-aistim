<script setup>
import { toRefs, computed } from 'vue'
import UiIcon from '../icons/UiIcon.vue'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps(['items', 'modelValue', 'isToggler', 'isFullWidth'])

// Data
const { items, modelValue, isToggler } = toRefs(props)

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})

// Methods
function setCurrentTab(value) {
  propValue.value = isToggler.value && propValue.value === value ? '' : value
}
</script>

<template>
  <div class="tab-buttons flex box" :class="{ 'full-width': isFullWidth }">
    <button
      v-for="item of items"
      :key="item.value"
      type="button"
      class="tab-buttons__item h-100 pl-20 pr-20 flex ai-c jc-c ggap-10 cut-1"
      :class="{ active: propValue === item.value, 'f-1': isFullWidth }"
      @click="setCurrentTab(item.value)"
    >
      <slot name="item" :item="item">
        <div
          class="ai-c ggap-10"
          :class="{ active: propValue === item.value, 'flex jc-c': !item.icon, 'grid gtc-auto-1': item.icon }"
        >
          <template v-if="item.icon">
            <UiIcon :size="item.iconSize ? item.iconSize : 16" :icon="item.icon" :pack="item.iconPack || 'outline'" />
          </template>
          <template v-if="item.text">
            {{ item.text }}
          </template>
        </div>
      </slot>
    </button>
  </div>
</template>
