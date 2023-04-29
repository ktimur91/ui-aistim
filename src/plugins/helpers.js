import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')
import { nextTick } from 'vue'

// Форматируем дату и время
export function formatDate(date) {
  return date ? dayjs(date).format('DD MMMM YYYY') : ''
}
export function formatDateTime(date) {
  return date ? dayjs(date).format('DD MMMM YYYY в HH:mm') : ''
}

// Валидация формы
export function isInvalidForm(elementId) {
  let res = false
  const el = document.getElementById(elementId)
  const inputs = el.querySelectorAll('.required')
  let counter = 0

  for (let i = 0; i < inputs.length; i++) {
    const element = inputs[i]
    if (element.getAttribute('data-success') === 'false') {
      element.classList.add('error')
      if (counter === 0) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      res = true
      counter++
    } else {
      element.classList.remove('error')
    }
  }

  return res
}

// Отключаем все кнопки
export function disableAllBtns(element, state) {
  nextTick(() => {
    const modal = document.querySelector(element)
    const btns = modal?.querySelectorAll('.btn') || []
    for (let btn of btns) {
      if (state) {
        btn.classList.add('disabled')
        btn.disabled = true
      } else {
        btn.classList.remove('disabled')
        btn.disabled = false
      }
    }
  })
}
