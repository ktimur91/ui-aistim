<script setup>
import { onMounted } from 'vue'

// Mounted
onMounted(() => {
  if (!navigator.userAgent.includes('Macintosh')) {
    const head = document.head
    const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'

    // Путь до вашего файла
    link.href = import('./assets/scss/for-windows.css')

    head.appendChild(link)
  }
})
</script>

<style>
/* В файле for-windows.css */
:root {
  --scroll: #999;
  --scroll-hover: #555;
  --scroll-bg: #ddd;
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--scroll) var(--scroll-bg);
}

*::-webkit-scrollbar {
  height: 12px;
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: var(--scroll-bg);
}

*::-webkit-scrollbar-thumb {
  background-color: var(--scroll);
  border-radius: 100px;
  border: 3px solid var(--scroll-bg);
}

*::-webkit-scrollbar-thumb:hover {
  background-color: var(--scroll-hover);
  border: 1px solid var(--scroll-bg);
}
</style>
