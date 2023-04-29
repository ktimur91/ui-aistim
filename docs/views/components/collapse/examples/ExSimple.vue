<script setup>
import { ref } from 'vue'

// Data
const positionY = ref('top')
</script>

<template>
  <div>
    <div class="flex ai-c jc-sb ggap-30 mb-20">
      <div>positionY</div>
      <div class="flex ai-c ggap-30">
        <UiFormRadio label="top" default-value="top" v-model="positionY" />
        <UiFormRadio label="bottom" default-value="bottom" v-model="positionY" />
      </div>
    </div>
  </div>

  <div class="grid">
    <UiCollapse
      triggerClass="btn md primary jc-c"
      :position-y="positionY"
      body-class="p-5 of-a example-ddown-body grid ggap-5"
    >
      <template #trigger>Это кнопка</template>

      <button v-for="item of 100" :key="item" class="btn sm link">Dropdown content {{ item }}</button>
    </UiCollapse>
  </div>
</template>

<style lang="scss">
.example-ddown-body {
  max-height: 350px;
}
</style>
