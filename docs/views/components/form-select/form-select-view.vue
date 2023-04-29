<script setup>
import { MainTemplate, MainExample, MainApiView } from '@/components'

// Examples
import ExSimple from './examples/ExSimple.vue'
import ExSimpleCode from './examples/ExSimple.vue?raw'

import ExStates from './examples/ExStates.vue'
import ExStatesCode from './examples/ExStates.vue?raw'

// Api
import props from './api/props'
import slots from './api/slots'
</script>

<template>
  <MainTemplate>
    <template #examples>
      <MainExample title="Basic usage" :component="ExSimple" :code="ExSimpleCode" />
      <MainExample title="States" :component="ExStates" :code="ExStatesCode" />
    </template>

    <template #api>
      <MainApiView title="Props" type="props" :rows="props" />
      <MainApiView title="Slots" type="slots" :rows="slots" />
    </template>
  </MainTemplate>
</template>
