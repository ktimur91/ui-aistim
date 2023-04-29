<script setup>
import { toRefs } from 'vue'

// Props
const props = defineProps({
  radius: {
    type: Boolean,
    default: true
  },
  size: {
    type: [String, Number],
    default: 50
  },
  position: {
    type: String,
    default: 'pos-a'
  },
  overlay: {
    type: String,
    default: 'white-transparent'
  },
  color: {
    type: String,
    default: 'primary'
  }
})

// Data
const { size } = toRefs(props)
</script>

<template>
  <div class="base-loading" :class="[{ radius: radius }, position, 'overlay-' + overlay, color]">
    <div class="base-loading__content flex fd-c ai-c jc-c ggap-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :width="size"
        :height="size"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        class="m-auto"
      >
        <circle cx="50" cy="50" r="30" stroke="rgba(70, 223, 240, 0)" stroke-width="0" fill="none"></circle>
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke-width="5"
          stroke-linecap="round"
          fill="none"
          transform="rotate(99.1555 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1.25s"
            values="0 50 50;180 50 50;720 50 50"
            keyTimes="0;0.5;1"
          ></animateTransform>
          <animate
            attributeName="stroke-dasharray"
            repeatCount="indefinite"
            dur="1.25s"
            values="18.84955592153876 169.64600329384882;131.94689145077132 56.548667764616255;18.84955592153876 169.64600329384882"
            keyTimes="0;0.5;1"
          ></animate>
        </circle>
      </svg>
      <slot />
    </div>
  </div>
</template>
