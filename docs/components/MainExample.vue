<script setup>
import MainCodeView from './MainCodeView.vue'
import MainCopyCode from './MainCopyCode.vue'

// Props
const props = defineProps({
  title: String,
  description: String,
  component: [Object, Function],
  code: String,
  codeLanguage: String,
  hasView: { type: Boolean, default: true },
  hasCode: { type: Boolean, default: true }
})
</script>

<template>
  <div v-if="props.title || props.description" class="grid ggap-5 mb-10">
    <h3 v-if="props.title" class="title">{{ props.title }}</h3>
    <div v-if="props.description" class="c-grey-ed">{{ props.description }}</div>
  </div>

  <div class="example grid ggap-20 of-h pos-r z0 mb-50 box" :class="props.hasView && props.hasCode ? 'gtc-2' : ''">
    <div v-if="props.hasView" class="example__components p-20">
      <component v-if="props.component" :is="props.component" />
    </div>
    <div v-if="props.hasCode" class="example__code of-a p-20">
      <MainCopyCode :code="props.code" />
      <MainCodeView :code="props.code" :language="codeLanguage" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.example {
  &__code {
    background-color: #282c34;
    display: -webkit-box;
  }
}
</style>
