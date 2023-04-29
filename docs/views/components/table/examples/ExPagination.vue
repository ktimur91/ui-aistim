<script setup>
import { ref } from 'vue'
import axios from '../mock'
import { formatDateTime } from '../../../../../src/plugins/index'
import { debounce } from 'lodash'

// Data
const hasColSettings = true
const hasRowSelectable = true
const hasRowEdit = true
const hasRowDelete = true

const cols = ref([])
const defaultCols = [
  {
    key: 'id',
    name: '#',
    hasSort: true,
    active: true
  },
  {
    key: 'fullName',
    name: 'Пользователь',
    hasSort: true,
    active: true
  },
  {
    key: 'position',
    name: 'Должность',
    hasSort: false,
    active: true
  },
  {
    key: 'age',
    name: 'Возраст',
    hasSort: false,
    active: true
  },
  {
    key: 'registrationDate',
    name: 'Дата регистрации',
    hasSort: true,
    active: true
  }
]

const rows = ref([])
const total = ref(0)

const isLoadCols = ref(true)
const isLoadRows = ref(true)

const selectedRows = ref([])
const deleteItem = ref(0)
const selectedItem = ref(0)

const formatters = {
  registrationDate: (val) => formatDateTime(val)
}

const filters = [
  {
    key: 'id',
    name: '# Номер',
    component: 'Number',
    componentProps: {}
  },
  {
    key: 'fullName',
    name: 'Пользователь',
    component: 'Search',
    componentProps: {
      getSearchResults: debounce(async (text, call) => {
        const params = {
          fullName: text,
          limit: 10
        }

        const res = await axios.get('/usersSearch', { params })

        return call(res.data.users.map((user) => user.fullName))
      }, 500)
    }
  },
  {
    key: 'position',
    name: 'Должность',
    component: 'Checklist',
    componentProps: {
      getList: async () => {
        const res = await axios.get('/positions', {})

        return res.data.positions
      }
    }
  },
  {
    key: 'age',
    name: 'Возраст',
    component: 'NumberRange',
    componentProps: {}
  },
  {
    key: 'registrationDate',
    name: 'Дата регистрации',
    component: 'Date',
    componentProps: {
      range: true
    }
  }
]

const filterValue = ref({})
const sortValue = ref({ sortBy: 'id', orderBy: 'asc' })

const pagination = ref({ current: 1, perPage: 25 })
const paginationPageOptions = ref([
  { value: 25, text: '25' },
  { value: 50, text: '50' },
  { value: 100, text: '100' }
])

// Created
main()

// Methods
async function main() {
  await getCols()
  await updateRows({ pagination: pagination.value, filterValue: {}, sortValue: {} })
}
async function getCols() {
  isLoadCols.value = true

  const res = await axios.get('/userCols')

  cols.value = res.data.userCols
  isLoadCols.value = false
}

async function updateRows(data) {
  isLoadRows.value = true

  const params = {
    ...data.filterValue,
    page: data.pagination.current,
    pageSize: data.pagination.perPage,
    order: data.sortValue.sortBy && data.sortValue.orderBy ? [data.sortValue.sortBy, data.sortValue.orderBy] : []
  }

  const res = await axios.get('/users', { params })

  rows.value = res.data.users.rows
  total.value = res.data.users.count
  isLoadRows.value = false
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
</script>

<template>
  <UiTable
    v-model:cols="cols"
    v-model:filterValue="filterValue"
    v-model:sortValue="sortValue"
    v-model:selectedRows="selectedRows"
    v-model:selectedItem="selectedItem"
    v-model:deleteItem="deleteItem"
    v-model:pagination="pagination"
    :has-col-settings="hasColSettings"
    :has-row-selectable="hasRowSelectable"
    :has-row-edit="hasRowEdit"
    :has-row-delete="hasRowDelete"
    :defaultCols="defaultCols"
    :formatters="formatters"
    :filters="filters"
    :rows="rows"
    :total="total"
    :page-options="paginationPageOptions"
    :loading="isLoadRows || isLoadCols"
    :sticky-top="50"
    @clickRow="clickRowAction"
    @editRow="editAction"
    @deleteRow="deleteAction"
    @change="updateRows"
  />
</template>
