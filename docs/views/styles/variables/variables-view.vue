<script setup>
import { MainTemplate, MainApiView } from '@/components'

// Examples
import vars from './api/vars'
</script>

<template>
  <MainTemplate>
    <template #api>
      <MainApiView type="variables" :rows="vars">
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
