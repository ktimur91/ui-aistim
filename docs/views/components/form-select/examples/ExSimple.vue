<script setup>
import { ref } from 'vue'
import noAvatar from '../../../../assets/logo.svg'

// Data
const selected = ref()
const selected2 = ref()
const items = [
  { value: 'a', text: 'This is First option' },
  { value: 'b', text: 'Selected Option' },
  { value: { C: '3PO' }, text: 'This is an option with object value' },
  { value: 'd', text: 'This one is disabled', disabled: true }
]
const items2 = [
  {
    value: 1,
    text: 'Листок Восток',
    position: 'Super designer',
    avatar: 'https://pixelbox.ru/wp-content/uploads/2021/02/mult-ava-instagram-2.jpg'
  },
  {
    value: 2,
    text: 'Кутумбаев Тимур',
    position: 'Front & Design',
    avatar: 'https://otkritkis.com/wp-content/uploads/2022/06/pdtrp.jpg'
  },
  {
    value: 3,
    text: 'Усипбалиев Айсултан',
    position: 'Super frontend',
    avatar: 'https://i.pinimg.com/originals/67/78/b4/6778b47782dfb30cd02cfe555ad57346.jpg'
  }
]
const currentTab = ref('md')
const tabs = [
  {
    text: 'sm',
    value: 'sm'
  },
  {
    text: 'md',
    value: 'md'
  },
  {
    text: 'lg',
    value: 'lg'
  }
]
</script>

<template>
  <UiTabButtons v-model="currentTab" :items="tabs" class="mb-30" />

  <section class="grid ggap-10 mb-50">
    <UiFormSelect label="Label" v-model="selected" :items="items" :size="currentTab" />
    <div class="mt-10">Value: {{ selected }}</div>
  </section>

  <section class="grid ggap-10">
    <UiFormSelect
      label="Label"
      v-model="selected2"
      :items="items2"
      item-class="btn lg link pl-10 pr-10 ta-left grid gtc-auto-1"
      :size="currentTab"
    >
      <template #selected="{ selected }">
        <div v-if="selected && selected.text" class="grid gtc-auto-1 ggap-10 ai-c">
          <div class="cover ava-24">
            <img :src="selected.avatar" />
          </div>
          <div>{{ selected.text }}</div>
        </div>
        <template v-else>Выберите</template>
      </template>

      <template #item="{ item }">
        <div class="cover ava-30">
          <img :src="item.avatar || noAvatar" />
        </div>
        <div class="grid">
          <div>{{ item.text }}</div>
          <small class="fw-n">{{ item.position }}</small>
        </div>
      </template>
    </UiFormSelect>
    <pre>{{ selected2 }}</pre>
  </section>
</template>
