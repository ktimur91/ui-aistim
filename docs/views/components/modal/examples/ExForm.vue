<script setup>
import { ref } from 'vue'

// Data
const isOpen = ref(false)
const formData = ref({})
</script>

<template>
  <UiModal v-if="isOpen" title="Какой то заголовок" size="md" @close="isOpen = false">
    <div class="grid ggap-30">
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiDropdown
        triggerClass="btn md primary jc-c"
        position-x="left"
        position-y="auto"
        body-width="trigger-width"
        body-class="p-5 of-a example-ddown-body grid ggap-5"
      >
        <template #trigger>Это кнопка</template>

        <button v-for="item of 100" :key="item" class="btn sm link">Dropdown content {{ item }}</button>
      </UiDropdown>
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
      <UiFormInput label="Введите ФИО" v-model="formData.name" />
    </div>
  </UiModal>

  <div class="flex ai-c fw ggap-10">
    <button class="btn md primary" @click="isOpen = !isOpen">Open modal Form</button>
  </div>
</template>

<style>
.example-ddown-body {
  max-height: 300px;
}
</style>
