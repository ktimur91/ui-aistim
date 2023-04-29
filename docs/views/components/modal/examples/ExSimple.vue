<script setup>
import { ref } from 'vue'

// Data
const isFullHeight = ref(false)
const isOpenXSM = ref(false)
const isOpenSM = ref(false)
const isOpenMD = ref(false)
const isOpenLG = ref(false)
const isOpenXLG = ref(false)
const isOpenFull = ref(false)
</script>

<template>
  <UiModal
    v-if="isOpenXSM"
    title="Какой то заголовок"
    :contentClass="isFullHeight ? 'full-height' : ''"
    size="xsm"
    @close="isOpenXSM = false"
  >
    <template #default>Modal with size = XSM (extra small)</template>
  </UiModal>

  <UiModal
    v-if="isOpenSM"
    title="Какой то заголовок"
    :contentClass="isFullHeight ? 'full-height' : ''"
    size="sm"
    @close="isOpenSM = false"
  >
    <template #default>Modal with size = SM (small)</template>
  </UiModal>

  <UiModal
    v-if="isOpenMD"
    title="Какой то заголовок"
    :contentClass="isFullHeight ? 'full-height' : ''"
    size="md"
    @close="isOpenMD = false"
  >
    <template #head>
      <small class="tag md green">Статус</small>
    </template>
    <template #default>Modal with size = MD (medium)</template>
  </UiModal>

  <UiModal
    v-if="isOpenLG"
    title="Какой то заголовок"
    :contentClass="isFullHeight ? 'full-height' : ''"
    size="lg"
    @close="isOpenLG = false"
  >
    <template #default>Modal with size = LG (large)</template>
  </UiModal>

  <UiModal
    v-if="isOpenXLG"
    title="Какой то заголовок"
    :contentClass="isFullHeight ? 'full-height' : ''"
    size="xlg"
    @close="isOpenXLG = false"
  >
    <template #default>Modal with size = XLG (extra large)</template>
  </UiModal>

  <UiModal
    v-if="isOpenFull"
    title="Какой то заголовок"
    :contentClass="isFullHeight ? 'full-height' : ''"
    size="full"
    @close="isOpenFull = false"
  >
    <template #default>Modal with size = FULL (full screen)</template>
  </UiModal>

  <div class="grid ggap-20">
    <button class="btn md outline jc-sb" @click="isFullHeight = !isFullHeight">
      Full height
      <UiFormFakeSwitch :isTrue="isFullHeight" />
    </button>
    <div class="flex ai-c fw ggap-10">
      <button class="btn md primary" @click="isOpenXSM = !isOpenXSM">Open modal XSM</button>
      <button class="btn md primary" @click="isOpenSM = !isOpenSM">Open modal SM</button>
      <button class="btn md primary" @click="isOpenMD = !isOpenMD">Open modal MD</button>
      <button class="btn md primary" @click="isOpenLG = !isOpenLG">Open modal LG</button>
      <button class="btn md primary" @click="isOpenXLG = !isOpenXLG">Open modal XLG</button>
      <button class="btn md primary" @click="isOpenFull = !isOpenFull">Open modal FULL</button>
    </div>
  </div>
</template>
