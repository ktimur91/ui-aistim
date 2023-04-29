<script setup>
import { MainTemplate, MainExample, MainApiView } from '@/components'

// Examples
import ExSimple from './examples/ExSimple.vue'
import ExSimpleCode from './examples/ExSimple.vue?raw'

import ExPagination from './examples/ExPagination.vue'
import ExPaginationCode from './examples/ExPagination.vue?raw'

// Api
import props from './api/props'
</script>

<template>
  <MainTemplate>
    <template #examples>
      <MainExample title="Basic view" :component="ExSimple" :hasCode="false" />
      <MainExample title="Code" :code="ExSimpleCode" :hasView="false" />

      <MainExample title="Basic view" :component="ExPagination" :hasCode="false" />
      <MainExample title="Code" :code="ExPaginationCode" :hasView="false" />
    </template>

    <template #api>
      <MainApiView title="Props" type="props" :rows="props" />
    </template>
  </MainTemplate>
</template>
