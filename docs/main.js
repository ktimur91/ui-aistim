import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import * as components from '../src/components'
import '../src/scss/ui-aistim.scss'
import './assets/main.scss'

const app = createApp(App)
app.use(router)

for (const key in components) {
  if (Object.hasOwnProperty.call(components, key)) {
    const element = components[key]
    if (element?.__name) app.component(element.__name, element)
  }
}

app.mount('#app')
