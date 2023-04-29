<template>
  <!-- <button v-if="items.length > 1" class="btn cancel w-100 jc-c" @click.prevent.stop="items.length = 0">
    Убрать все уведомления
  </button> -->
  <TransitionGroup v-if="items && items.length" name="fade" tag="div" class="toast grid ggap-10" @click.stop>
    <UiToastItem v-for="(item, index) of items" :key="item" :index="index" :item="item" @remove="removeItem" />
  </TransitionGroup>
</template>

<script setup>
import { toRefs } from 'vue'
import UiToastItem from './UiToastItem.vue'

// Props
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

// Data
const { items } = toRefs(props)

// Methods
function removeItem(index) {
  if (index > -1) items.value.splice(index, 1)
}
</script>
