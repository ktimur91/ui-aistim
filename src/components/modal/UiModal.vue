<script setup>
import { ref, onMounted, toRefs, getCurrentInstance, computed, onBeforeUnmount } from 'vue'
import UiIcon from '../icons/UiIcon.vue'

// Emits
const emits = defineEmits(['scrollAction', 'close', 'submit'])

// Props
const props = defineProps({
  id: {
    type: String,
    default: 'modal'
  },
  title: {
    type: String,
    default: 'title'
  },
  size: {
    type: String,
    default: 'md'
  },
  contentClass: {
    type: String,
    default: ''
  },
  bodyClass: {
    type: String,
    default: 'p-20'
  },
  footerClass: {
    type: String,
    default: ''
  },
  isHead: {
    type: Boolean,
    default: true
  },
  isFoot: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: 'Отмена'
  },
  submitText: {
    type: String,
    default: 'Отправить'
  }
})

// Data
const { id, contentClass, bodyClass, footerClass } = toRefs(props)
const uid = getCurrentInstance().uid
const closeHeight = ref(0)

// Computed
const el = computed(() => document.querySelector('#modal__content-' + uid))

// Mounted
onMounted(() => {
  if (el?.value) el.value?.addEventListener('DOMSubtreeModified', setHeight, false)

  // Scroll blocked
  document.body.classList.add('of-h')
})

// Before destroy
onBeforeUnmount(() => {
  // Scroll unblocked
  document.body.classList.remove('of-h')
})

// Methods
function submitAction() {
  emits('submit')
}
function closeAction() {
  emits('close')
}
function scrollAction() {
  emits('scrollAction')
  if (el.value?.scrollHeight >= closeHeight.value) setHeight()
}
function setHeight() {
  closeHeight.value = el.value?.scrollHeight ? el.value.scrollHeight + 40 : 0
}
</script>

<template>
  <teleport to="body">
    <div :id="id" class="modal modal-wrapper" @scroll="scrollAction">
      <!-- Content -->
      <div
        :id="'modal__content-' + uid"
        class="modal__content grid gtr-auto-1-auto"
        :class="[props.size, contentClass]"
      >
        <!-- Head -->
        <div v-if="props.isHead" class="modal__content-header grid gtc-1-auto ggap-20 ai-c pl-20 pr-20 pt-15 pb-15">
          <div class="flex ai-c ggap-10">
            <h2 class="modal__content-header-title title">
              {{ props.title }}
            </h2>
            <slot name="head-left" />
          </div>

          <div class="flex ai-c ggap-10">
            <slot name="head-right" />
            <button @click.stop="closeAction" class="btn cancel md cube">
              <UiIcon size="20" icon="close" />
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="modal__content-body f-1 pos-r z-0" :class="bodyClass">
          <slot />
        </div>

        <!-- Foot -->
        <div
          v-if="props.isFoot"
          class="modal__content-footer pl-20 pr-20 pt-15 pb-15"
          :class="footerClass ? footerClass : 'flex ai-c jc-fe ggap-10'"
        >
          <slot name="foot">
            <button class="btn cancel jc-c" type="button" @click.prevent="closeAction">{{ props.cancelText }}</button>
            <button class="btn primary jc-c" type="button" @click.prevent="submitAction">{{ props.submitText }}</button>
          </slot>
        </div>
      </div>

      <!-- Close -->
      <button
        class="modal__close"
        :style="closeHeight ? { height: closeHeight + 'px' } : ''"
        @click.stop="closeAction"
      />
    </div>
  </teleport>
</template>
