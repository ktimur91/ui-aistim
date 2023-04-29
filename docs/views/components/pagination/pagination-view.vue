<script setup>
import { MainTemplate, MainExample, MainApiView } from '@/components'

// Examples
import ExSimple from './examples/ExSimple.vue'
import ExSimpleCode from './examples/ExSimple.vue?raw'

// Api
import props from './api/props'
</script>

<template>
  <MainTemplate>
    <template #examples>
      <MainExample title="Basic view" :component="ExSimple" :hasCode="false" />
      <MainExample title="Code" :code="ExSimpleCode" :hasView="false" />
    </template>

    <template #api>
      <MainApiView title="Props" type="props" :rows="props" />
    </template>
  </MainTemplate>
</template>
