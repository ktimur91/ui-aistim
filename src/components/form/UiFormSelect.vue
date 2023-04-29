<script setup>
import { computed, ref, toRefs } from 'vue'
import { UiDropdown, UiIcon } from '../index'

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
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

// Data
const { items, itemClass, appendToBody, label, placeholder, size, disabled, required, isError, modelValue } =
  toRefs(props)
const ddown = ref()

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
const isSuccess = computed(() => {
  let res = true
  // Тут будет валидация если поле обязательное
  return res
})
const hasSelected = computed(() => !!propValue?.value?.text)

// Methods
function selectAction(item) {
  propValue.value = propValue.value?.value === item.value ? null : item
  ddown.value.closeAction()
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
          disabled: disabled,
          error: isError,
          placeholder: !hasSelected
        },
        size
      ]"
      body-class="p-0"
      :position-y="positionY"
      :append-to-body="appendToBody"
    >
      <template #trigger>
        <slot name="selected" :selected="propValue">
          {{ propValue && propValue.text ? propValue.text : placeholder }}
        </slot>
        <UiIcon icon="chevron-down" color="grey" size="14" />
      </template>

      <div class="form-autocomplete__list grid ggap-5 p-5 of-a">
        <template v-if="items && items.length">
          <button
            v-for="item of items"
            :key="item.value"
            type="button"
            :class="[itemClass, { active: propValue && propValue.value === item.value }]"
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
