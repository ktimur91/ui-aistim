<script setup>
import { directive } from 'vue-tippy'
import vClickOutside from 'click-outside-vue3/src/v-click-outside.js'
import { ref, toRefs, computed, watch } from 'vue'
import { UiIcon, UiFormTableCheckbox, UiFormCheckbox } from '../index'
import 'tippy.js/dist/tippy.css'

function check() {
  return true
}

// Emits
const emits = defineEmits([
  'update:sorted',
  'update:order',
  'update:selectedRows',
  'update:deleteItem',
  'update:selectedItem',
  'clickRow',
  'edit',
  'delete',
  'update:current',
  'update:perPage',
  'change'
])

// Props
const props = defineProps({
  rows: Array,
  cols: Array,
  sorted: {
    type: String,
    default: 'id'
  },
  order: {
    type: String,
    default: 'asc'
  },
  hasCheckbox: {
    type: Boolean,
    default: false
  },
  hasEdit: {
    type: Boolean,
    default: true
  },
  hasDelete: {
    type: Boolean,
    default: true
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
  stickyTop: {
    type: String,
    default: '50px'
  },
  hasFooter: {
    type: Boolean,
    default: false
  },
  hasPagination: {
    type: Boolean,
    default: false
  },

  total: {
    type: Number
  },
  current: {
    type: Number
  },
  perPage: {
    type: Number,
    default: 30
  },
  pageOptions: {
    type: Array,
    default: () => [
      { value: 30, text: '30' },
      { value: 60, text: '60' },
      { value: 90, text: '90' }
    ]
  }
})

// Data
const {
  cols,
  rows,
  sorted,
  order,
  hasCheckbox,
  hasEdit,
  hasDelete,
  selectedRows,
  deleteItem,
  selectedItem,
  stickyTop,
  hasFooter,
  hasPagination,
  current,
  perPage,
  total
} = toRefs(props)
const stateAll = ref('') // '' | 'partly' | 'all'
const vTippy = directive

// Computed
const propSelectedRows = computed({
  get: () => selectedRows.value,
  set: (val) => emits('update:selectedRows', val)
})
const propSorted = computed({
  get: () => sorted.value,
  set: (val) => emits('update:sorted', val)
})
const propOrder = computed({
  get: () => order.value,
  set: (val) => emits('update:order', val)
})
const propDeleteItem = computed({
  get: () => deleteItem.value,
  set: (val) => emits('update:deleteItem', val)
})
const propSelectedItem = computed({
  get: () => selectedItem.value,
  set: (val) => emits('update:selectedItem', val)
})

const pageOptions = ref([
  { value: 30, text: '30' },
  { value: 60, text: '60' },
  { value: 90, text: '90' }
])

function updatePagination(data) {
  emits('change', data)
}

// Watch
watch(propSelectedRows, (val) => {
  setStateCheckbox(val)
})

// Methods
function colClickAction(col) {
  if (!col.hasSort) return

  if (propSorted.value === col.key) {
    propOrder.value = propOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    propOrder.value = 'asc'
    propSorted.value = col.key
  }
}
function clickRowAction(row) {
  propSelectedItem.value = row.id
  emits('clickRow', row)
}
function selectRowAction(rowId) {
  const index = propSelectedRows.value?.length ? propSelectedRows.value.findIndex((el) => el === rowId) : -1
  if (index === -1) {
    propSelectedRows.value.push(rowId)
  } else {
    propSelectedRows.value.splice(index, 1)
  }
  setStateCheckbox(propSelectedRows.value)
}
function selectAllAction() {
  propSelectedRows.value = !propSelectedRows.value.length ? rows.value.map((el) => el.id) : []
}
function setStateCheckbox(val) {
  if (val.length && val.length < rows.value.length) {
    stateAll.value = 'partly'
  } else if (val.length && val.length === rows.value.length) {
    stateAll.value = 'all'
  } else {
    stateAll.value = ''
  }
}
</script>

<template>
  <div class="table b-rad">
    <!-- Head -->
    <div class="table__head pos-s flex z-3 of-h" :style="{ top: stickyTop }">
      <!-- Checkbox -->
      <span class="table__head-cell table__cell table__checkbox flex ai-c jc-c" :class="{ selected: !!stateAll }">
        <UiFormTableCheckbox v-model="stateAll" @update:modelValue="selectAllAction" size="sm" />
      </span>

      <!-- Cell -->
      <button
        v-for="col of cols"
        :key="col.key"
        class="table__head-cell table__cell flex ai-c ggap-5 fs-12"
        :class="[{ active: propSorted === col.key }, col.position]"
        :style="{ width: col.width !== 'auto' ? col.width : '', flex: col.width === 'auto' ? '1' : 'unset' }"
        @click="colClickAction(col)"
      >
        <span class="cut-1">{{ col.name }}</span>
        <span v-if="col.hasSort" class="table__head-cell-sort flex ai-c jc-c">
          <UiIcon :icon="propOrder === 'asc' ? 'arrow-down' : 'arrow-up'" size="14" color="primary" />
        </span>
      </button>
      <!-- </span> -->
    </div>

    <!-- Body -->
    <div class="table__body grid" :class="{ 'no-footer': !hasFooter || !hasPagination }">
      <div
        v-for="row of rows"
        :key="row.id"
        class="table__body-row pos-r z-0 of-h flex"
        :class="{
          delete: propDeleteItem === row.id,
          visited: propSelectedItem === row.id,
          selected: propSelectedRows.length ? propSelectedRows.includes(row.id) : false
        }"
        @mouseup.ctrl.stop="selectRowAction(row.id)"
        @mousedown.stop="clickRowAction(row)"
      >
        <!-- Actions -->
        <div v-if="hasEdit || hasDelete" class="table__actions pos-a z-1 pl-10 pr-10 flex ai-c jc-fe ggap-10">
          <!-- Edit -->
          <button v-if="hasEdit" class="btn outline sm pos-r z-1" type="button" @click.prevent="emits('edit', row.id)">
            <UiIcon icon="edit" size="14" color="grey" /> Редактировать
          </button>

          <!-- Delete -->
          <template v-if="hasDelete">
            <div
              v-if="propDeleteItem === row.id"
              v-click-outside="() => (propDeleteItem = 0)"
              class="flex ai-c pos-r z-1 btn-group"
            >
              <button
                class="btn sm outline"
                type="button"
                @click.prevent="emits('delete', row.id)"
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
        </div>

        <!-- Checkbox -->
        <span v-if="hasCheckbox" class="table__body-cell table__cell table__checkbox flex ai-c jc-c" @click.stop>
          <UiFormCheckbox :default-value="row.id" v-model="propSelectedRows" size="sm" />
        </span>

        <!-- Cell -->
        <span
          v-for="col of cols"
          :key="`row-${col.key}`"
          class="table__body-cell table__cell grid ai-c"
          :class="col.position"
          :style="{
            width: col.width && col.width !== 'auto' ? col.width : '',
            flex: !col.width || col.width === 'auto' ? '1' : 'unset'
          }"
        >
          <slot :name="col.key" :row="row" :cell="row[col.key]">
            <span class="cut-1">
              {{ col.formatter ? col.formatter(row[col.key]) : row[col.key] }}
            </span>
          </slot>
        </span>
      </div>
    </div>

    <!-- Foot -->
    <div v-if="hasFooter" class="table__foot pos-s flex z-2 of-h">
      <slot name="foot" />
    </div>

    <!-- Foot -->
    <div v-if="hasPagination" class="table__foot pos-s flex z-2 of-h">
      <UiPagination
        :current="current"
        :perPage="perPage"
        :total="total"
        :page-options="pageOptions"
        append-to-body
        position-y="top"
        @update:current="(event) => emits('update:current', event)"
        @update:per-page="(event) => emits('update:perPage', event)"
        @change="updatePagination"
      ></UiPagination>
    </div>
  </div>
</template>
