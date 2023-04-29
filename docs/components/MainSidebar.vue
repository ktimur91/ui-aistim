<script setup>
import { RouterLink } from 'vue-router'
import { computed, ref } from 'vue'

// Data
const searchText = ref('')
const baseNav = [
  {
    id: 'home',
    link: '/',
    name: 'Getting started'
  }
]
const componentsNav = ref([
  {
    id: 'alert',
    link: '/alert',
    name: 'Alert'
  },
  {
    id: 'collapse',
    link: '/collapse',
    name: 'Collapse'
  },
  {
    id: 'dropdown',
    link: '/dropdown',
    name: 'Dropdown'
  },
  {
    id: 'icons',
    link: '/icons',
    name: 'Icon'
  },
  {
    id: 'loading',
    link: '/loading',
    name: 'Loading'
  },
  {
    id: 'form-autocomplete',
    link: '/form-autocomplete',
    name: 'Form autocomplete'
  },
  {
    id: 'form-input',
    link: '/form-input',
    name: 'Form Input'
  },
  {
    id: 'form-select',
    link: '/form-select',
    name: 'Form Select'
  },
  {
    id: 'form-checkbox',
    link: '/form-checkbox',
    name: 'Form Checkbox'
  },
  {
    id: 'form-switch',
    link: '/form-switch',
    name: 'Form Switch'
  },
  {
    id: 'form-radio',
    link: '/form-radio',
    name: 'Form Radio'
  },
  {
    id: 'form-date',
    link: '/form-date',
    name: 'Form Date'
  },
  {
    id: 'table',
    link: '/table',
    name: 'Table'
  },
  {
    id: 'pagination',
    link: '/pagination',
    name: 'Pagination'
  },
  {
    id: 'toast',
    link: '/toast',
    name: 'Toast'
  },
  {
    id: 'tabs',
    link: '/tabs',
    name: 'Tabs'
  },
  {
    id: 'modal',
    link: '/modal',
    name: 'Modal'
  }
])
const stylesNav = ref([
  {
    id: 'variables',
    link: '/variables',
    name: 'Variables'
  },
  {
    id: 'button',
    link: '/button',
    name: 'Button'
  },
  {
    id: 'tag',
    link: '/tag',
    name: 'Tag'
  }
])
const currentTheme = ref(localStorage.getItem('theme') || 'light')

// Computed
const componentsNavRows = computed(() => {
  return searchText.value
    ? componentsNav.value.filter((el) => el.name.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase()))
    : componentsNav.value
})
const stylesNavRows = computed(() => {
  return searchText.value
    ? stylesNav.value.filter((el) => el.name.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase()))
    : stylesNav.value
})

// Created
setCurrentTheme()

// Methods
function toggleTheme() {
  let res = 'light'
  if (currentTheme.value === 'light') res = 'dark'

  localStorage.setItem('theme', res)
  currentTheme.value = res
  setCurrentTheme()
}
function setCurrentTheme() {
  document.documentElement.classList.remove(currentTheme.value === 'light' ? 'dark' : 'light')
  document.documentElement.classList.add(currentTheme.value)
}
</script>

<template>
  <div class="main-sidebar b-r">
    <div class="main-sidebar__head grid ggap-20 pl-20 pr-20 pt-10 pb-10 pos-s z-3">
      <div class="flex ai-c jc-sb ggap-10">
        <RouterLink to="/" class="main-sidebar__logo flex ai-c ggap-10">
          <img src="@/assets/logo.svg" />
          <h4 class="m-0 fw-b">BCA-UI</h4>
        </RouterLink>
        <button class="btn sm cube rounded outline" @click="toggleTheme">
          <UiIcon :icon="currentTheme === 'dark' ? 'sun' : 'moon'" size="18" />
        </button>
      </div>

      <UiFormInput v-model="searchText" placeholder="Search" type="search" class="md" />
    </div>

    <nav class="pos-s grid ggap-30 p-20 pb-50">
      <RouterLink
        v-for="item of baseNav"
        :key="item.id"
        class="btn link sm"
        :to="item.link"
        exact-active-class="active"
      >
        {{ item.name }}
      </RouterLink>

      <!-- Components -->
      <div class="grid ggap-10">
        <b class="pl-10">Components</b>
        <div v-if="componentsNavRows && componentsNavRows.length" class="grid ggap-10">
          <RouterLink
            v-for="item of componentsNavRows"
            :key="item.id"
            class="btn link sm"
            :to="item.link"
            exact-active-class="active"
          >
            {{ item.name }}
          </RouterLink>
        </div>
        <UiAlert v-else color="yellow">Ничего не найдено</UiAlert>
      </div>

      <!-- Styles -->
      <div class="grid ggap-10">
        <b class="pl-10">Styles</b>
        <div v-if="stylesNavRows && stylesNavRows.length" class="grid ggap-10">
          <RouterLink
            v-for="item of stylesNavRows"
            :key="item.id"
            class="btn link sm"
            :to="item.link"
            exact-active-class="active"
          >
            {{ item.name }}
          </RouterLink>
        </div>
        <UiAlert v-else color="yellow">Ничего не найдено</UiAlert>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.main-sidebar {
  background-color: var(--box);
  width: 250px;
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 1;
  overflow: auto;

  &__head {
    top: 0;
    background-color: var(--box);
  }

  &__logo {
    img {
      width: auto;
      height: 20px;
    }
  }

  .btn {
    color: #777;

    &:hover {
      color: #000;
    }
    &.active {
      color: #fff;
    }
  }
}
</style>
