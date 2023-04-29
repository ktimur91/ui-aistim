<script setup>
import { RouterView } from 'vue-router'
import { MainSidebar } from '@/components'
</script>

<template>
  <div class="default-layout grid gtc-auto-1">
    <MainSidebar />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
.default-layout {
  background-color: var(--bg);
}
</style>
