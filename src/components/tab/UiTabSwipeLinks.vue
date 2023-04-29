<script setup>
import { toRefs } from 'vue'
import { useRoute } from 'vue-router'
import UiIcon from '../icons/UiIcon.vue'

// Props
const props = defineProps(['items'])

// Data
const { items } = toRefs(props)
const route = useRoute()
</script>

<template>
  <div class="tab-swipe flex ggap-20">
    <slot name="start" />

    <RouterLink
      v-for="item of items"
      :key="item.link"
      :to="item.append ? `${route.path}/${item.link}` : item.link"
      class="tab-swipe__item"
      exact-active-class="active"
    >
      <slot name="item" :item="item">
        <UiIcon v-if="item.icon" size="16" :icon="item.icon" :pack="item.iconPack || 'outline'" />
        {{ item.text }}
      </slot>
    </RouterLink>

    <slot name="end" />
  </div>
</template>
