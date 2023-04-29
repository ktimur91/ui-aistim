<script setup>
import { ref } from 'vue'

const props = defineProps({
  code: {
    type: String,
    default: ''
  }
})

const text = ref('copy')

const resetMessage = () => {
  text.value = 'copy'
}

const textarea = ref(null)

const copy = (event) => {
  let textArea = textarea.value

  if (document.execCommand('copy') == true) {
    // older browser support
    let range, selection
    textArea.focus()
    textArea.select()
    range = document.createRange()
    range.selectNodeContents(textArea)
    selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
    textArea.setSelectionRange(0, textArea.value.length)
    document.execCommand('copy')
  } else {
    // modern browser support (using the clipboard API)
    navigator.clipboard.writeText(props.code)
  }

  event.target.focus()
  text.value = 'copied'
}
</script>

<template>
  <div class="copy-code" tabindex="0" @focusout="resetMessage" @click="copy">
    <textarea class="copy-code__textarea" ref="textarea" :value="props.code" tabindex="1" readonly></textarea>
    <div class="copy-code__copy">{{ text }}</div>
  </div>
</template>

<style lang="scss">
.copy-code {
  position: absolute;
  cursor: pointer;
  transition: 0.3s opacity linear;
  opacity: 0.5;
  height: 24px;
  width: 80px;
  top: 0;
  right: 0;

  &:hover {
    opacity: 1;
  }

  &__textarea {
    user-select: none;
    position: absolute;
    padding: 0;
    width: 0;
    height: 0;
    background: transparent;
    resize: none;
    opacity: 0;
    border-color: rgba(0, 0, 0, 0);
  }

  &__copy {
    position: absolute;
    font-family: sans-serif;
    display: block;
    font-size: 12px;
    color: white;
    width: 80px;
    height: 24px;
    line-height: 24px;
    background: rgba(0, 0, 0, 0.8);
    box-sizing: border-box;
    text-align: center;
    border-radius: 4px;
  }
}
</style>
