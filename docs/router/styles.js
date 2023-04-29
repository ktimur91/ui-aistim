export default [
  {
    path: 'variables',
    meta: {
      title: 'Variables'
    },
    component: () => import('../views/styles/variables/variables-view.vue')
  },
  {
    path: 'button',
    meta: {
      title: 'Button'
    },
    component: () => import('../views/styles/button/button-view.vue')
  },
  {
    path: 'tag',
    meta: {
      title: 'Tag'
    },
    component: () => import('../views/styles/tag/tag-view.vue')
  }
]
