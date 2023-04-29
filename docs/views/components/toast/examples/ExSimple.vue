<script setup>
import { ref } from 'vue'
import ToastComponent from './ToastComponent.vue'
import ToastComponentSecond from './ToastComponentSecond.vue'

// Data
const items = ref([])

// Methods
function setToast(type) {
  if (type === 'error') {
    items.value.push({
      color: 'red',
      icon: 'alert-triangle',
      iconPack: 'solid',
      title: 'Ошибка',
      message: 'Сообщение о какой то ошибке!'
    })
  }
  if (type === 'warning') {
    items.value.push({
      color: 'yellow',
      icon: 'info-circle',
      iconPack: 'solid',
      title: 'Внимание',
      message: 'Уведомляем что что-то не так и обратите на это внимание!'
    })
  }
  if (type === 'info') {
    items.value.push({
      color: 'blue',
      icon: 'info-circle',
      iconPack: 'solid',
      title: 'Информируем',
      message: 'Информируем о чем то важном и не очень'
    })
  }
  if (type === 'success') {
    items.value.push({
      color: 'green',
      icon: 'check-circle',
      iconPack: 'solid',
      title: 'Успех',
      message: 'Что-то прошло успешно'
    })
  }
  if (type === 'custom') {
    items.value.push({
      color: 'blue',
      component: ToastComponent
    })
  }
  if (type === 'custom-second') {
    items.value.push({
      color: 'yellow',
      icon: 'info-circle',
      iconPack: 'solid',
      title: 'Изменения',
      component: ToastComponentSecond
    })
  }
}
</script>

<template>
  <UiToast :items="items" />

  <div class="flex ai-c fw ggap-10">
    <button class="btn md red" @click="setToast('error')">Error toast</button>
    <button class="btn md yellow" @click="setToast('warning')">Warning toast</button>
    <button class="btn md primary" @click="setToast('info')">Info toast</button>
    <button class="btn md green" @click="setToast('success')">Success toast</button>
    <button class="btn md grey" @click="setToast('custom')">Custom toast</button>
    <button class="btn md outline" @click="setToast('custom-second')">Custom second toast</button>
  </div>
</template>
