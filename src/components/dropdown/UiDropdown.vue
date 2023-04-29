<script setup>
import vClickOutside from 'click-outside-vue3/src/v-click-outside.js'
import { nextTick, ref, toRefs, watch, onMounted, onUnmounted } from 'vue'

// Emits
const emits = defineEmits(['opened'])

// Props
const props = defineProps({
  triggerType: {
    type: String,
    default: 'button'
  },
  triggerClass: {
    type: [String, Array, Object],
    default: 'btn md outline'
  },
  bodyClass: {
    type: [String, Array, Object],
    default: 'p-5'
  },
  bodyWidth: {
    type: String,
    default: 'trigger-width',
    validator(value) {
      return ['auto', 'trigger-width'].includes(value)
    }
  },
  positionX: {
    type: String,
    default: 'left',
    validator(value) {
      return ['left', 'right'].includes(value)
    }
  },
  positionY: {
    type: String,
    default: 'auto',
    validator(value) {
      return ['auto', 'top', 'bottom'].includes(value)
    }
  },
  appendToBody: {
    type: Boolean,
    default: false
  }
})

// Data
const { triggerClass, bodyClass, bodyWidth, positionX, positionY, appendToBody } = toRefs(props)
const isOpen = ref(false)
const dropdownTriggerEl = ref()
const dropdownBodyEl = ref()
const dropdownWrapper = ref()

// Watch
watch(isOpen, (val) => {
  emits('opened', val)
})

// Mounted
onMounted(() => {
  toggleEventListener('addEventListener')
  if (appendToBody.value) {
    dropdownWrapper.value.replaceWith(...dropdownWrapper.value.children)
  }
})

// Un Mounted
onUnmounted(() => {
  toggleEventListener('removeEventListener')
})

// Methods
function getScrollContainers(element) {
  const elements = [window]

  if (!element) {
    return elements
  }

  let parent = element.parentElement
  while (parent) {
    const { overflow, overflowY } = window.getComputedStyle(parent)
    if (overflow.split(' ').every((o) => o === 'auto' || o === 'scroll')) {
      elements.push(parent)
    }
    if (overflowY.split(' ').every((o) => o === 'auto' || o === 'scroll')) {
      elements.push(parent)
    }
    parent = parent.parentElement
  }

  return elements
}
function toggleEventListener(eventType) {
  window[eventType]('resize', calcCoords)

  const scrollContainers = getScrollContainers(dropdownTriggerEl.value)

  for (const scrollContainer of scrollContainers) {
    scrollContainer[eventType]('scroll', calcCoords)
  }
}
function toggleAction() {
  isOpen.value = !isOpen.value
  calcCoords()
}
function closeAction() {
  isOpen.value = false
}
function calcCoords() {
  nextTick(async () => {
    const style = {
      width: '',
      maxWidth: ''
    }

    const dropdownBody = dropdownBodyEl.value
    const dropdownTrigger = dropdownTriggerEl.value
    if (dropdownBody && dropdownTrigger) {
      const dropdownTriggerRect = dropdownTrigger.getBoundingClientRect()

      const getIsOpenedTopValue = () => {
        if (positionY.value === 'bottom') {
          return false
        } else if (positionY.value === 'top') {
          return true
        } else {
          return Math.max(window.innerHeight || document.documentElement.clientHeight) / 2 < dropdownTriggerRect.bottom
        }
      }

      const isOpenedTop = getIsOpenedTopValue()

      if (appendToBody.value) {
        style.top = dropdownTriggerRect.top + window.scrollY

        if (isOpenedTop) {
          style.top -= dropdownBody.clientHeight + 6
        } else {
          style.top += dropdownTrigger.clientHeight
        }

        style.top = style.top + 2 + 'px'
        style.bottom = ''
      } else {
        style.top = isOpenedTop ? '' : 'calc(100% + 2px)'
        style.bottom = isOpenedTop ? 'calc(100% + 2px)' : ''
      }

      if (positionX.value === 'right') {
        const dropdownBodyRect = dropdownBody.getBoundingClientRect()

        if (bodyWidth.value === 'trigger-width') {
          style.left = appendToBody.value ? dropdownTriggerRect.left + window.scrollX + 'px' : '0px'
        } else {
          style.left = appendToBody.value
            ? dropdownTriggerRect.left + window.scrollX - (dropdownBodyRect.width - dropdownTriggerRect.width) + 'px'
            : dropdownTriggerRect.width - dropdownBodyRect.width + 'px'
        }
      } else {
        style.left = appendToBody.value ? dropdownTriggerRect.left + window.scrollX + 'px' : '0px'
      }

      if (bodyWidth.value === 'trigger-width') {
        style.width = `${dropdownTrigger.clientWidth}px`
        style.maxWidth = `${dropdownTrigger.clientWidth}px`
      }
      // else {
      //   style.minWidth = `${dropdownTrigger.clientWidth}px`
      // }

      dropdownBody.style.top = style.top
      dropdownBody.style.bottom = style.bottom
      dropdownBody.style.left = style.left
      dropdownBody.style.width = style.width
      dropdownBody.style.maxWidth = style.maxWidth
      // dropdownBody.style.minWidth = style.minWidth
      dropdownBody.style.zIndex = appendToBody.value ? '2002' : '3'

      if (appendToBody.value) {
        // Если выходит на пределы экрана
        const dropdownBodyRect = dropdownBody.getBoundingClientRect()

        if (Math.max(0, 0 - dropdownBodyRect.top) > 0) {
          dropdownBody.style.top = dropdownTriggerRect.top + window.scrollY - dropdownBodyRect.bottom + 'px'
        }
        if (Math.max(0, dropdownBodyRect.bottom - window.innerHeight)) {
          dropdownBody.style.top =
            dropdownTriggerRect.bottom + window.scrollY - (dropdownBodyRect.bottom - window.innerHeight) + 'px'
        }
      }
    }
  })
}

// Expose
defineExpose({
  closeAction,
  calcCoords
})
</script>

<template>
  <div ref="dropdownWrapper" class="pos-r">
    <component
      :is="triggerType"
      :type="triggerType === 'button' ? 'button' : ''"
      :class="[triggerClass, { active: isOpen }]"
      ref="dropdownTriggerEl"
      @click.prevent="toggleAction"
    >
      <slot name="trigger" :active="isOpen" />
    </component>

    <teleport to="body" :disabled="!appendToBody">
      <div v-if="isOpen" class="pos-a box shadow" :class="bodyClass" ref="dropdownBodyEl" v-click-outside="closeAction">
        <slot />
      </div>
    </teleport>
  </div>
</template>
