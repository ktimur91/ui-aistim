<script setup>
import { formatDateTime } from '../../../../../src/plugins/index'
import { ref } from 'vue'

// Data
const total = ref(1000)
const current = ref(1)
const perPage = ref(30)

const isLoad = ref(false)
const sortedBy = ref('id')
const orderBy = ref('asc')
const cols = ref([
  {
    key: 'id',
    name: '#',
    hasSort: true,
    active: true,
    width: '60px'
  },
  {
    key: 'user',
    name: 'Пользователь',
    hasSort: true,
    active: true,
    width: 'auto'
  },
  {
    key: 'emails',
    name: 'E-mail',
    hasSort: false,
    active: true,
    width: '300px'
  },
  {
    key: 'phones',
    name: 'Телефоны',
    hasSort: false,
    active: true,
    width: '350px'
  },
  {
    key: 'summ',
    name: 'Сумма',
    hasSort: true,
    active: true,
    width: '150px',
    position: 'right',
    hasSumm: true,
    formatter: (val) => val?.toLocaleString() + ' KZT' || '-'
  },
  {
    key: 'date',
    name: 'Дата регистрации',
    hasSort: true,
    active: true,
    width: '200px',
    position: 'right',
    formatter: (val) => formatDateTime(val)
  }
])
const rows = ref([])
const selectedRows = ref([])
const deleteItem = ref(0)
const selectedItem = ref(0)

// Created
generateRows()

// Methods
function generateRows() {
  const arr = [
    {
      id: 1,
      user: {
        id: 1,
        name: 'Кутумбаев Тимур',
        avatar: 'https://otkritkis.com/wp-content/uploads/2022/06/pdtrp.jpg'
      },
      emails: ['test@mail.ru', 'job@mail.ru'],
      phones: ['+7(666)555-44-33'],
      summ: 856035,
      date: new Date()
    },
    {
      id: 2,
      user: {
        id: 2,
        name: 'Листок Восток',
        avatar:
          'https://sun6-21.userapi.com/s/v1/ig2/qKfhy4LW1c70BduAkN-U5z7iLKnPiRBrtRWudztyU2kDanpmXw4Tgfdk3u6K3TIyiIDNObqtgGopAnknU3GbpkOZ.jpg?size=2278x2305&quality=95&crop=104,144,2278,2305&ava=1'
      },
      emails: ['test@mail.ru', 'job@mail.ru'],
      phones: ['+7(666)555-44-33', '+7(666)555-44-33', '+7(666)555-44-33'],
      summ: 1250000,
      date: new Date()
    },
    {
      id: 3,
      user: {
        id: 3,
        name: 'Котенко Александр',
        avatar: 'https://pixelbox.ru/wp-content/uploads/2021/07/ava-youtube-cs-go-12.jpg'
      },
      emails: ['test@mail.ru', 'job@mail.ru'],
      phones: ['+7(666)555-44-33', '+7(666)555-44-33', '+7(666)555-44-33'],
      summ: 1250000,
      date: new Date()
    },
    {
      id: 4,
      user: {
        id: 4,
        name: 'Усипбалиев Айсултан',
        avatar:
          'https://magazin-tolstovok.ru/image/cache/catalog/image/icon/tolstovki-s-printami/kollekciya-magazina-tolstovok/jivotnie/bear-glass/tolstovka-svitshot-futbolka-medved-v-ochkah-11-1184x1675.jpg'
      },
      emails: ['test@mail.ru', 'job@mail.ru'],
      phones: ['+7(666)555-44-33', '+7(666)555-44-33', '+7(666)555-44-33'],
      summ: 1250000,
      date: new Date()
    }
  ]

  for (let i = 0; i < 20; i++) {
    const randIndex = Math.floor(Math.random() * 4)
    rows.value.push({
      ...arr[randIndex],
      id: i + 1
    })
  }
}
function clickRowAction(row) {
  selectedItem.value = row.id
}
function editAction(rowId) {
  console.log(rowId)
}
function deleteAction(rowId) {
  console.log(rowId)
}
function updatePagination(data) {
  console.log(data)
}
</script>

<template>
  <UiTable
    :cols="cols"
    :rows="rows"
    class="w-100pr"
    :sticky-top="50"
    has-checkbox
    has-pagination
    v-model:sorted="sortedBy"
    v-model:order="orderBy"
    v-model:selectedRows="selectedRows"
    v-model:selectedItem="selectedItem"
    v-model:deleteItem="deleteItem"
    v-model:current="current"
    v-model:perPage="perPage"
    v-model:isLoading="isLoad"
    :total="total"
    @clickRow="clickRowAction"
    @edit="editAction"
    @delete="deleteAction"
    @change="updatePagination"
  >
    <template #user="{ cell }">
      <div class="grid gtc-auto-1 ggap-10 ai-c">
        <div class="cover ava-20">
          <img :src="cell.avatar" />
        </div>
        <div class="flex ai-c">
          <a href="#" class="cut-1">{{ cell.name }}</a>
        </div>
      </div>
    </template>

    <template #emails="{ cell }">
      <div class="flex fw ggap-5 ai-c">
        <template v-for="(email, index) of cell" :key="index">
          <small v-if="index < 2" class="tag white-box md">{{ email }}</small>
        </template>
        <small v-if="cell.length > 2" class="tag white sm">Еще {{ cell.length - 2 }}</small>
      </div>
    </template>

    <template #phones="{ cell }">
      <div class="flex fw ggap-5 ai-c">
        <template v-for="(phone, index) of cell" :key="index">
          <small v-if="index < 2" class="tag white-box md">{{ phone }}</small>
        </template>
        <small v-if="cell.length > 2" class="tag white sm">Еще {{ cell.length - 2 }}</small>
      </div>
    </template>

    <template #foot> qwe </template>
  </UiTable>
</template>
