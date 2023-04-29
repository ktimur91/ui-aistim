import { createRouter, createWebHistory } from 'vue-router'

// Modules
import components from './components'
import styles from './styles'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/default-layout.vue'),
      children: [...components, ...styles]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/error-view.vue')
    }
  ]
})

export default router
