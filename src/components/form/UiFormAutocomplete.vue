<script setup>
import { computed, nextTick, ref, toRefs, watch } from 'vue'
import { UiDropdown, UiIcon, UiFormInput } from '../index'

// Emits
const emits = defineEmits(['update:modelValue', 'focused'])

// Props
const props = defineProps({
  items: {
    type: Array,
    default: () => [
      {
        text: 'Выберите',
        value: 0
      }
    ]
  },
  itemClass: {
    type: String,
    default: 'btn link sm w-100pr'
  },
  appendToBody: {
    type: Boolean,
    default: false
  },
  positionY: {
    type: String,
    default: 'auto'
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Выберите'
  },
  size: {
    type: String,
    default: 'md'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  isError: {
    type: Boolean,
    default: false
  },
  isMultiselect: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [Object, Array],
    default: () => ({})
  }
})

// Data
const {
  items,
  itemClass,
  appendToBody,
  positionY,
  label,
  placeholder,
  autocomplete,
  size,
  disabled,
  required,
  isError,
  isMultiselect,
  modelValue
} = toRefs(props)
const ddown = ref()
const ddownSearch = ref()
const searchText = ref('')

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
const filteredItems = computed(() => {
  return searchText.value
    ? items.value.filter((el) => el.text.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase()))
    : items.value
})
const isSuccess = computed(() => {
  let res = true
  // Тут будет валидация если поле обязательное
  return res
})
const hasSelected = computed(() => (isMultiselect.value ? !!propValue?.value?.length : !!propValue?.value?.text))

// Watch
watch(searchText, () => {
  ddown.value?.calcCoords()
})

// Methods
function selectAction(item) {
  if (isMultiselect.value) {
    const hasItem = propValue.value.findIndex((el) => el.value === item.value)
    if (hasItem !== -1) {
      propValue.value.splice(hasItem, 1)
    } else {
      propValue.value.push(item)
    }
  } else {
    propValue.value = propValue.value?.value === item.value ? null : item
    searchText.value = ''
    ddown.value.closeAction()
  }
}
function setFocus(state) {
  if (state) {
    nextTick(() => {
      ddownSearch.value.setFocus()
    })
  } else {
    searchText.value = ''
  }
}
function isActive(val) {
  let res = false
  if (isMultiselect.value) {
    res = propValue.value.findIndex((el) => el.value === val) !== -1
  } else {
    res = propValue.value?.value === val
  }
  return res
}
function removeItem(val) {
  const index = propValue.value.findIndex((el) => el.value === val)
  if (index !== -1) {
    propValue.value.splice(index, 1)
  }
}
</script>

<template>
  <div
    class="form-item grid"
    :class="[{ required: required, disabled: disabled, error: isError }, size]"
    :data-success="isSuccess"
  >
    <label v-if="label" class="form-item__label">
      {{ label }}
    </label>
    <UiDropdown
      ref="ddown"
      :triggerClass="[
        {
          'btn input ggap-20 jc-sb w-100pr': true,
          'pl-5 pr-5 max-content': isMultiselect,
          disabled: disabled,
          error: isError,
          placeholder: !hasSelected
        },
        size
      ]"
      :position-y="positionY"
      :append-to-body="appendToBody"
      body-class="p-0"
      @opened="setFocus"
    >
      <template #trigger>
        <div v-if="isMultiselect" class="flex ai-c fw ggap-5">
          <template v-if="propValue && propValue.length">
            <small v-for="tag of propValue" :key="tag.value" class="tag tag--btn primary-light lg">
              {{ tag.text }}
              <button class="btn xsm cube outline" type="button" @click.stop="removeItem(tag.value)">
                <UiIcon icon="close" color="grey" size="12" />
              </button>
            </small>
          </template>
          <template v-else>
            <div class="pl-10 pr-10">{{ placeholder }}</div>
          </template>
        </div>
        <template v-else>
          <slot name="trigger" :selected="propValue">
            {{ propValue && propValue.text ? propValue.text : placeholder }}
            <UiIcon icon="chevron-down" color="grey" size="14" />
          </slot>
        </template>
      </template>

      <div class="form-autocomplete__search p-5">
        <UiFormInput
          class="mini"
          ref="ddownSearch"
          type="search"
          placeholder="Найти"
          :autocomplete="autocomplete"
          size="sm"
          v-model="searchText"
        />
      </div>

      <div class="form-autocomplete__list grid ggap-5 p-5 of-a">
        <template v-if="filteredItems && filteredItems.length">
          <button
            v-for="item of filteredItems"
            :key="item.value"
            type="button"
            class="btn link sm w-100pr"
            :class="[itemClass, { active: isActive(item.value) }]"
            @click="selectAction(item)"
          >
            <slot name="item" :item="item" :active="propValue && propValue.value === item.value">
              {{ item.text }}
            </slot>
          </button>
        </template>
        <div v-else class="flex ai-c jc-c c-grey-ed pb-5">Ничего не найдено</div>
      </div>
    </UiDropdown>
  </div>
</template>

<style lang="scss">
.form-autocomplete {
  &__list {
    max-height: 300px;
  }
}
</style>
