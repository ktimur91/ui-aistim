<script setup>
import { MainTemplate, MainExample, MainApiView } from '../../../components'

// Examples
import ExList from './examples/ExList.vue'
import ExSample from './examples/ExSample.vue'
import ExSampleCode from './examples/ExSample.vue?raw'

// Api
import props from './api/props'
</script>

<template>
  <MainTemplate>
    <template #examples>
      <MainExample :component="ExList" :hasCode="false" />
      <MainExample title="Example" :component="ExSample" :code="ExSampleCode" />
    </template>

    <template #api>
      <MainApiView title="Props" description="" type="props" :rows="props" />
    </template>
  </MainTemplate>
</template>

<style></style>
