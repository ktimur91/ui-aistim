<template>
  <div
    class="toast__item box shadow pl-20 pr-20 pt-15 pb-15 grid ggap-10"
    :class="[item.color, { 'gtc-auto-1': item.icon }]"
    @click.stop
  >
    <!-- Close -->
    <button class="toast__item-close btn sm rounded cube p-0" @click.stop="removeItem">
      <UiIcon class="grey" size="16" icon="close" />
    </button>

    <!-- Content -->
    <div v-if="item.icon" class="toast__item-icon">
      <UiIcon size="18" :pack="item.iconPack" :icon="item.icon" />
    </div>
    <div class="toast__item-text pr-20">
      <h4 v-if="item.title" class="title mb-5">{{ item.title }}</h4>
      <component v-if="item.component" :is="item.component" class="fs-14" />
      <div v-else class="fs-14 c-grey-ed" v-html="item.message" />
    </div>
  </div>
</template>

<script setup>
import { debounce } from 'lodash'
import { toRefs } from 'vue'
import UiIcon from '../icons/UiIcon.vue'

// Emits
const emits = defineEmits(['remove'])

// Props
const props = defineProps({
  index: Number,
  item: {
    type: Object,
    default: () => ({
      color: 'blue', // blue | yellow | red | green
      icon: 'info-circle', // bell | info-circle | alert-triangle | check-circle
      iconPack: 'outline', // outline | solid
      title: '',
      message: 'Some alert message, will be here!'
    })
  }
})

// Data
const { index, item } = toRefs(props)

// Created
const removeItemAfet = debounce(removeItem, 10000)
removeItemAfet()

// Methods
function removeItem() {
  emits('remove', index.value)
}
</script>
