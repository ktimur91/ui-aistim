<script setup>
import { MainTemplate, MainExample, MainApiView } from '@/components'

// Examples
import ExSimple from './examples/ExSimple.vue'
import ExSimpleCode from './examples/ExSimple.vue?raw'

import ExTypes from './examples/ExTypes.vue'
import ExTypesCode from './examples/ExTypes.vue?raw'

import ExIcons from './examples/ExIcons.vue'
import ExIconsCode from './examples/ExIcons.vue?raw'

// Api
import props from './api/props'
import slots from './api/slots'
</script>

<template>
  <MainTemplate>
    <template #examples>
      <MainExample title="Basic usage" :component="ExSimple" :code="ExSimpleCode" />
      <MainExample title="Types" :component="ExTypes" :code="ExTypesCode" />
      <MainExample title="Icons" :component="ExIcons" :code="ExIconsCode" />
    </template>

    <template #api>
      <MainApiView title="Props" type="props" :rows="props" />
      <MainApiView title="Slots" type="slots" :rows="slots" />
    </template>
  </MainTemplate>
</template>
