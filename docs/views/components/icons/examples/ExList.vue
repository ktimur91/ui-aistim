<script setup>
import { computed, onMounted, ref } from 'vue'

// Data
const searchText = ref('')
const itemsOutline = ref([])
const itemsSolid = ref([])

// Computed
const rowsOutline = computed(() => {
  return searchText.value
    ? itemsOutline.value.filter((el) => el.toLowerCase().includes(searchText.value.toLocaleLowerCase()))
    : itemsOutline.value
})
const rowsSolid = computed(() => {
  return searchText.value
    ? itemsSolid.value.filter((el) => el.toLowerCase().includes(searchText.value.toLocaleLowerCase()))
    : itemsSolid.value
})

// Mounted
onMounted(async () => {
  itemsSolid.value = await getView('solid')
  itemsOutline.value = await getView('outline')
})

// Methods
async function getView(packName) {
  const result = []

  const pack = {
    outline: import.meta.glob('../../../../../src/components/icons/outline/*.vue'),
    solid: import.meta.glob('../../../../../src/components/icons/solid/*.vue')
  }

  if (!pack[packName]) return result

  const path = `../../../../../src/components/icons/${packName}/`

  for (const key in pack[packName]) {
    if (Object.hasOwnProperty.call(pack[packName], key)) {
      const element = pack[packName][key]
      const str = element.name.split(path)[1]
      const name = str?.length ? str.substring(0, str.length - 4) : ''
      if (name) result.push(name)
    }
  }

  return result
}
</script>

<template>
  <UiFormInput v-model="searchText" placeholder="Search icons" type="search" class="md mb-30" />
  <h3 class="title mb-10">Pack: outline</h3>
  <div v-if="rowsOutline && rowsOutline.length" class="grid gtc-5 ggap-20 mb-50">
    <div v-for="item of rowsOutline" :key="item" class="icon-item flex fd-c ai-c jc-c ggap-10 box p-20">
      <UiIcon :icon="item" color="primary" />
      <span>{{ item }}</span>
    </div>
  </div>
  <UiAlert v-else class="mb-50 yellow">Ничего не найдено</UiAlert>

  <h3 class="title mb-10">Pack: solid</h3>
  <div v-if="rowsSolid && rowsSolid.length" class="grid gtc-5 ggap-20">
    <div v-for="item of rowsSolid" :key="item" class="icon-item flex fd-c ai-c jc-c ggap-5 box p-20">
      <UiIcon pack="solid" :icon="item" color="primary" />
      <span>{{ item }}</span>
    </div>
  </div>
  <UiAlert v-else class="mb-50 yellow">Ничего не найдено</UiAlert>
</template>

<style lang="scss">
.icon-item {
  background-color: #fff;

  &:hover {
    background-color: var(--grey-el);
  }
}
</style>
