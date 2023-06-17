<script setup>
import { ref, watch } from 'vue'

// Data
const test = ref(undefined)
const currentTab = ref('md')
const items = [
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
const formData = ref([
  {
    phone: '7778404341'
  }
])

watch(test, (val) => {
  console.log(val)
  console.log(typeof val)
})

// Methods
function addPhone() {
  formData.value.push({
    phone: ''
  })
}
</script>

<template>
  <UiTabButtons v-model="currentTab" :items="items" class="mb-30" />

  <section class="grid ggap-10">
    <UiFormInput placeholder="text" type="text" :size="currentTab" />
    <UiFormInput label="Number" placeholder="number" type="number" minlength="0" maxlength="13" :size="currentTab" />
    <UiFormInput
      label="Number mask"
      placeholder="number"
      type="number"
      hasMask
      mask="############"
      :minlength="0"
      :maxlength="12"
      :size="currentTab"
    />
    <UiFormInput placeholder="email" type="email" :size="currentTab" />
    <UiFormInput placeholder="password" type="password" :size="currentTab" />
    <UiFormInput placeholder="search" type="search" :size="currentTab" />
    <hr class="mt-20 mb-20" />

    <template v-for="(el, index) of formData" :key="index">
      <div v-if="formData.length > 1" class="p-20">
        <UiFormInput placeholder="+7 (___) ___-__-__" has-mask type="tel" :size="currentTab" v-model="el.phone" />
      </div>
      <UiFormInput v-else placeholder="+7 (___) ___-__-__" has-mask type="tel" :size="currentTab" v-model="el.phone" />
    </template>
    <button @click="addPhone">add</button>
  </section>

  <pre>{{ test }}</pre>
  <select name="fdjk" v-model="test">
    <option value="">empty {{ null }}</option>
    <option :value="null">null</option>
    <option :value="undefined">undefined</option>
    <option value="1">123</option>
    <option :value="0">0</option>
    <option :value="false">false</option>
  </select>
</template>
