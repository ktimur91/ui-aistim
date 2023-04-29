<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="main-header flex ai-c jc-sb pl-30 pr-30 b-b">
    <h3 class="title">UI</h3>
    <nav class="flex ai-c ggap-10">
      <RouterLink to="/" class="btn link sm">Компоненты</RouterLink>
      <RouterLink to="/plugins" class="btn link sm">Плагины</RouterLink>
      <RouterLink to="/rules" class="btn link sm">Правила</RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.main-header {
  background-color: #fff;
  height: 40px;
}
</style>
