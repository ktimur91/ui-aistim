<script setup>
import { ref } from 'vue'

const current = ref(1)
const total = ref(1000)
const perPage = ref(25)
const pageOptions = ref([
  { value: 25, text: '25' },
  { value: 50, text: '50' },
  { value: 100, text: '100' }
])

function updateData(data) {
  console.log(data)
}
</script>

<template>
  <UiPagination
    v-model:current="current"
    v-model:perPage="perPage"
    :page-options="pageOptions"
    :total="total"
    append-to-body
    position-y="auto"
    @change="updateData"
  ></UiPagination>
</template>
