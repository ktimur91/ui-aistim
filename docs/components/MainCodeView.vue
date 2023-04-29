<script setup>
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { toRefs } from 'vue'

const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'xml'
  }
})

const { language, code } = toRefs(props)

const handler = (el, binding) => {
  el.innerHTML = hljs.highlight(binding.value, { language: language.value }).value
  el.className = `hljs ${language.value}`
}

const vHighlight = {
  created: handler,
  updated: handler
}
</script>

<template>
  <pre class="m-0"><code v-highlight="code"></code></pre>
</template>

<style>
pre code.hljs {
  overflow: inherit;
  padding: 0;
  line-height: 24px;
}
</style>
