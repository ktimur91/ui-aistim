<script setup>
import { MainTemplate, MainExample, MainApiView } from '@/components'

// Examples
import ExTypes from './examples/ExTypes.vue'
import ExTypesCode from './examples/ExTypes.vue?raw'

// Props
import vars from './api/vars'
</script>

<template>
  <MainTemplate>
    <template #examples>
      <MainExample title="Types" :component="ExTypes" :code="ExTypesCode" />
    </template>
    <template #api>
      <MainApiView type="styles" :rows="vars">
        <template #value="{ row }">
          <div v-if="row.type === 'color'" class="flex ai-c ggap-10">
            <span class="tag sm rounded" :style="{ backgroundColor: row.value }">&nbsp;&nbsp;</span>
            <span class="">{{ row.value }}</span>
          </div>
          <template v-else>{{ row.value || '—' }}</template>
        </template>
      </MainApiView>
    </template>
  </MainTemplate>
</template>
