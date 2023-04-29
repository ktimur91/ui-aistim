<script setup>
import { ref } from 'vue'

// Data
const positionX = ref('left')
const positionY = ref('auto')
const bodyWidth = ref('trigger-width')
const appendToBody = ref(true)
</script>

<template>
  <div>
    <div class="flex ai-c jc-sb ggap-30 mb-20">
      <div>positionX</div>
      <div class="flex ai-c ggap-30">
        <UiFormRadio label="left" default-value="left" v-model="positionX" />
        <UiFormRadio label="right" default-value="right" v-model="positionX" />
      </div>
    </div>
    <div class="flex ai-c jc-sb ggap-30 mb-20">
      <div>positionY</div>
      <div class="flex ai-c ggap-30">
        <UiFormRadio label="auto" default-value="auto" v-model="positionY" />
        <UiFormRadio label="top" default-value="top" v-model="positionY" />
        <UiFormRadio label="bottom" default-value="bottom" v-model="positionY" />
      </div>
    </div>
    <div class="flex ai-c jc-sb ggap-30 mb-20">
      <div>bodyWidth</div>
      <div class="flex ai-c ggap-30">
        <UiFormRadio label="auto" default-value="auto" v-model="bodyWidth" />
        <UiFormRadio label="trigger-width" default-value="trigger-width" v-model="bodyWidth" />
      </div>
    </div>
    <div class="flex ai-c jc-sb ggap-30 mb-20">
      <div>appendToBody</div>
      <div class="flex ai-c ggap-30">
        <UiFormRadio label="true" :default-value="true" v-model="appendToBody" />
        <UiFormRadio label="false" :default-value="false" v-model="appendToBody" />
      </div>
    </div>
  </div>

  <div class="flex">
    <UiDropdown
      triggerClass="btn md primary jc-c"
      :position-x="positionX"
      :position-y="positionY"
      :body-width="bodyWidth"
      body-class="p-5 of-a example-ddown-body grid ggap-5"
      :append-to-body="appendToBody"
    >
      <template #trigger>Это кнопка</template>

      <button v-for="item of 100" :key="item" class="btn sm link">Dropdown content {{ item }}</button>
    </UiDropdown>
  </div>
</template>

<style lang="scss">
.example-ddown-body {
  max-height: 350px;
}
</style>
