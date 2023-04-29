<script setup>
import { computed, ref, useSlots } from 'vue'
import { useRoute } from 'vue-router'

const slots = useSlots()

// Data
const route = useRoute()
const currentTab = ref('examples')

// Computed
const hasExamples = computed(() => slots?.examples)
const hasApi = computed(() => slots?.api)
const title = computed(() => route?.meta?.title || 'Page title')

// Created
if (hasApi.value && !hasExamples.value) {
  currentTab.value = 'api'
}
</script>

<template>
  <div class="page grid gtr-auto-1">
    <div class="page__head">
      <div class="content flex ai-c ggap-50">
        <h2 class="title">{{ title }}</h2>

        <UiTabSwipe
          v-if="hasExamples && hasApi"
          v-model="currentTab"
          :items="[
            {
              text: 'Examples',
              value: 'examples'
            },
            {
              text: 'API',
              value: 'api'
            }
          ]"
        />
      </div>
    </div>

    <div class="page__body">
      <div class="content pt-30 pb-30">
        <slot v-if="currentTab === 'examples'" name="examples" />
        <slot v-if="currentTab === 'api'" name="api" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  &__head {
    height: 50px;
    box-shadow: inset 0 -2px 0 0 var(--bcolor);
    position: sticky;
    top: 0;
    z-index: 3;
    background-color: var(--box);
  }
}
</style>
