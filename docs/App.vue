<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

// Mounted
onMounted(() => {
  if (!navigator.userAgent.includes('Macintosh')) {
    const head = document.head

    const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = import('./assets/for-windows.css')

    head.appendChild(link)
  }
})
</script>

<template>
  <div class="grid h-100vh">
    <RouterView />
  </div>
</template>
