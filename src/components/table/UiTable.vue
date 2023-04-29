<script setup>
import { toRefs, computed, watch } from 'vue'
import { cloneDeep, isEqual } from 'lodash'
import vClickOutside from 'click-outside-vue3/src/v-click-outside.js'
import { directive as vTippy } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

import { UiIcon, UiLoading, UiFormCheckbox, UiPagination, UiDropdown } from '../index'
import { disableAllBtns } from '../../plugins/index'

import TableFilter from './TableFilter.vue'
import TableCols from './TableCols.vue'

// Emits
const emits = defineEmits([
  'update:cols',
  'update:filterValue',
  'update:sortValue',
  'update:selectedRows',
  'update:selectedItem',
  'update:deleteItem',
  'update:pagination',
  'clickRow',
  'editRow',
  'deleteRow',
  'change'
])

// Props
const props = defineProps({
  hasColSettings: {
    type: Boolean,
    default: false
  },
  hasRowSelectable: {
    type: Boolean,
    default: false
  },
  hasRowEdit: {
    type: Boolean,
    default: false
  },
  hasRowDelete: {
    type: Boolean,
    default: false
  },
  cols: {
    type: Array,
    default: () => []
  },
  defaultCols: {
    type: Array,
    default: () => []
  },
  rows: {
    type: Array,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  },
  loading: {
    type: Boolean,
    default: false
  },
  selectedRows: {
    type: Array,
    default: () => []
  },
  deleteItem: {
    type: [Number, String],
    default: 0
  },
  selectedItem: {
    type: [Number, String],
    default: 0
  },
  formatters: {
    type: Object,
    default: null
  },
  filters: {
    type: Array,
    default: null
  },
  filterValue: {
    type: Object,
    default: () => ({})
  },
  sortValue: {
    type: Object,
    default: () => ({})
  },
  pagination: {
    type: Object,
    default: null
  },
  pageOptions: {
    type: Array,
    default: () => [
      { value: 25, text: '25' },
      { value: 50, text: '50' },
      { value: 100, text: '100' }
    ]
  },
  stickyTop: {
    type: Number,
    default: 50
  }
})

// Data
const {
  hasColSettings,
  hasRowSelectable,
  hasRowEdit,
  hasRowDelete,
  cols,
  defaultCols,
  rows,
  total,
  loading,
  selectedRows,
  deleteItem,
  selectedItem,
  formatters,
  filters,
  filterValue,
  sortValue,
  pagination,
  pageOptions,
  stickyTop
} = toRefs(props)

// Computed
const visibleCols = computed(() => cols.value.filter((col) => col.active))
const propSelectedRows = computed({
  get: () => selectedRows.value,
  set: (val) => emits('update:selectedRows', val)
})
const propDeleteItem = computed({
  get: () => deleteItem.value,
  set: (val) => emits('update:deleteItem', val)
})
const propSelectedItem = computed({
  get: () => selectedItem.value,
  set: (val) => emits('update:selectedItem', val)
})

// Watch
watch(loading, (val) => {
  disableAllBtns('#base-table', val)
})
watch(
  sortValue,
  (val) => {
    emits(
      'change',
      cloneDeep({
        filterValue: filterValue.value,
        sortValue: val,
        pagination: pagination.value
      })
    )
  },
  { deep: true }
)
watch(
  filterValue,
  (newVal, oldVal) => {
    if (isEqual(newVal, oldVal)) {
      return
    }

    if (pagination.value && pagination.value.current !== 1) {
      emits('update:pagination', { ...pagination.value, current: 1 })
    } else {
      emits(
        'change',
        cloneDeep({
          filterValue: newVal,
          sortValue: sortValue.value,
          pagination: pagination.value
        })
      )
    }
  },
  { deep: true }
)
watch(
  pagination,
  (val) => {
    emits(
      'change',
      cloneDeep({
        pagination: val,
        filterValue: filterValue.value,
        sortValue: sortValue.value
      })
    )
  },
  { deep: true }
)

// Methods
function colClickAction(col) {
  if (!col.hasSort) return

  if (sortValue.value.sortBy === col.key) {
    emits('update:sortValue', {
      ...sortValue.value,
      orderBy: sortValue.value.orderBy === 'asc' ? 'desc' : 'asc'
    })
  } else {
    emits('update:sortValue', {
      ...sortValue.value,
      orderBy: 'asc',
      sortBy: col.key
    })
  }
}
function clickRowAction(row) {
  propSelectedItem.value = row
  emits('clickRow', row)
}
function selectAllAction() {
  propSelectedRows.value = !propSelectedRows.value.length ? rows.value.map((el) => el.id) : []
}
function selectRowAction(rowId) {
  const index = propSelectedRows.value?.length ? propSelectedRows.value.findIndex((el) => el === rowId) : -1
  if (index === -1) {
    propSelectedRows.value.push(rowId)
  } else {
    propSelectedRows.value.splice(index, 1)
  }
}
function getCellValue(col, row) {
  return formatters.value?.[col.key] ? formatters.value?.[col.key](row[col.key]) : row[col.key]
}
</script>

<template>
  <div id="base-table" class="base-table box pos-r z-0">
    <!-- Toolbar -->
    <div class="base-table__toolbar flex ai-c ggap-10 jc-sb p-10 pos-s z-4" :style="{ top: stickyTop + 'px' }">
      <!-- Left -->
      <div class="flex ai-c ggap-10">
        <div class="btn-group flex ai-c">
          <button class="btn sm outline btn-group__first" @click="selectAllAction">
            <UiIcon icon="check-circle" pack="solid" :color="propSelectedRows.length ? 'primary' : 'grey'" size="16" />
            <template v-if="propSelectedRows.length">Снять выделение ({{ propSelectedRows.length }})</template>
            <template v-else>Выделить на странице</template>
          </button>
          <UiDropdown
            trigger-class="btn sm outline btn-group__last"
            position-x="right"
            body-width="auto"
            body-class="p-5 grid ggap-5"
            append-to-body
          >
            <template #trigger>
              <UiIcon icon="chevron-down" size="16" />
            </template>

            <!-- Body -->
            <button class="btn link sm">Выделить все записи из БД</button>
            <button class="btn link sm">Выделить все удаленные</button>
            <button class="btn link sm">Выделить все не активные</button>
          </UiDropdown>
        </div>
        <template v-if="propSelectedRows.length">
          <button class="btn sm outline"><UiIcon icon="trash" color="red" size="16" /> Удалить</button>
          <slot name="left" />
        </template>
      </div>

      <!-- Right -->
      <div class="flex ai-c ggap-10">
        <template v-if="!propSelectedRows.length">
          <slot name="right" />

          <TableFilter
            v-if="filters"
            :filters="filters"
            :model-value="filterValue"
            @update:modelValue="(event) => emits('update:filterValue', event)"
          />
          <TableCols
            v-if="hasColSettings"
            :default-value="defaultCols"
            :model-value="cols"
            @update:modelValue="(event) => emits('update:cols', event)"
          />
        </template>
      </div>
    </div>

    <!-- Table -->
    <div class="base-table__wrapper pos-r z-0">
      <UiLoading v-if="loading" />

      <table class="table w-100pr">
        <!-- Head -->
        <thead class="table__head pos-s z-3" :style="{ top: stickyTop + 50 + 'px' }">
          <th v-if="hasRowSelectable" class="pl-10 pr-10 table__checkbox">&nbsp;</th>
          <th v-for="col of visibleCols" :key="col.key" class="table__head-cell">
            <button
              class="table__head-cell-btn flex ai-c ggap-10 w-100pr"
              :class="[{ active: sortValue.sortBy === col.key }, col.type]"
              @click="colClickAction(col)"
            >
              <span class="cut-1">{{ col.name }}</span>
              <span v-if="col.hasSort" class="table__head-cell-btn-icon flex ai-c jc-c">
                <UiIcon :icon="sortValue.orderBy === 'asc' ? 'arrow-down' : 'arrow-up'" size="14" color="primary" />
              </span>
            </button>
          </th>
          <th v-if="hasRowEdit || hasRowDelete">&nbsp;</th>
        </thead>

        <!-- Body -->
        <tbody>
          <tr
            v-for="row of rows"
            :key="row.id"
            class="table__row pos-r"
            :class="{
              delete: propDeleteItem === row.id,
              visited: propSelectedItem && propSelectedItem.id === row.id,
              selected: propSelectedRows.length ? propSelectedRows.includes(row.id) : false
            }"
            @mouseup.ctrl.stop="selectRowAction(row.id)"
            @mousedown.stop="clickRowAction(row)"
          >
            <td v-if="hasRowSelectable" class="pl-10 pr-10 table__checkbox">
              <UiFormCheckbox :default-value="row.id" v-model="propSelectedRows" />
            </td>
            <td
              v-for="col of visibleCols"
              :key="`row-${col.key}`"
              class="table__cell"
              :class="col.type ? col.type : ''"
            >
              <slot :name="col.key" :row="row" :cell="row[col.key]">
                <div class="grid">
                  <span class="cut-1">{{ getCellValue(col, row) }}</span>
                </div>
              </slot>
            </td>
            <td v-if="hasRowEdit || hasRowDelete">
              <div
                class="table__actions flex ai-c jc-fe ggap-10 pl-10 pr-10 pos-a"
                :class="{ active: propDeleteItem === row.id }"
              >
                <slot name="actions">
                  <!-- Edit -->
                  <button
                    v-if="hasRowEdit"
                    class="btn outline sm pos-r z-1"
                    type="button"
                    @click.prevent="emits('editRow', row.id)"
                  >
                    <UiIcon icon="edit" size="14" color="grey" /> Редактировать
                  </button>

                  <!-- Delete -->
                  <template v-if="hasRowDelete">
                    <div
                      v-if="propDeleteItem === row.id"
                      v-click-outside="() => (propDeleteItem = 0)"
                      class="flex ai-c pos-r z-1 btn-group"
                    >
                      <button
                        class="btn sm outline"
                        type="button"
                        @click.prevent="emits('deleteRow', row.id)"
                        v-tippy="'Вы действительно хотите удалить'"
                      >
                        <UiIcon class="red" size="14" icon="trash" /> Удалить
                      </button>
                      <button class="btn sm outline" type="button" @click.prevent="propDeleteItem = 0">Отмена</button>
                    </div>
                    <button v-else class="btn sm outline pos-r z-1" type="button" @click.stop="propDeleteItem = row.id">
                      <UiIcon class="grey" size="14" icon="trash" /> Удалить
                    </button>
                  </template>

                  <!-- Overlay -->
                  <div class="table__actions-overlay pos-a z-0" />
                </slot>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Foot -->
    <div v-if="pagination" class="base-table__pagination pos-s grid z-2 of-h p-10 b-t">
      <UiPagination
        :modelValue="pagination"
        :total="total"
        :page-options="pageOptions"
        append-to-body
        position-y="top"
        @update:modelValue="(event) => emits('update:pagination', event)"
      />
    </div>
  </div>
</template>
