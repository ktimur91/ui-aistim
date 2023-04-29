<script setup>
import { MainTemplate, MainExample, MainApiView } from '@/components'

// Examples
import ExSimple from './examples/ExSimple.vue'
import ExSimpleCode from './examples/ExSimple.vue?raw'
import ExForm from './examples/ExForm.vue'
import ExFormCode from './examples/ExForm.vue?raw'

// Api
import props from './api/props'
</script>

<template>
  <MainTemplate>
    <template #examples>
      <MainExample title="Basic usage" :component="ExSimple" :code="ExSimpleCode" />
      <MainExample title="Form" :component="ExForm" :code="ExFormCode" />
    </template>

    <template #api>
      <MainApiView title="Props" type="props" :rows="props" />
    </template>
  </MainTemplate>
</template>
