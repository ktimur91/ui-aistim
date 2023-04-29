export default [
  {
    path: '',
    meta: {
      title: 'Getting started'
    },
    component: () => import('../views/components/index/index-view.vue')
  },
  {
    path: 'icons',
    meta: {
      title: 'Icons'
    },
    component: () => import('../views/components/icons/icons-view.vue')
  },
  {
    path: 'loading',
    meta: {
      title: 'Loading'
    },
    component: () => import('../views/components/loading/loading-view.vue')
  },
  {
    path: 'tabs',
    meta: {
      title: 'Tabs'
    },
    component: () => import('../views/components/tabs/tabs-view.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/components/tabs/examples/ExSimpleContentFirst.vue')
      },
      {
        path: 'second',
        component: () => import('../views/components/tabs/examples/ExSimpleContentSecond.vue')
      }
    ]
  },
  {
    path: 'modal',
    meta: {
      title: 'Modal'
    },
    component: () => import('../views/components/modal/modal-view.vue')
  },
  {
    path: 'alert',
    meta: {
      title: 'Alert'
    },
    component: () => import('../views/components/alert/alert-view.vue')
  },
  {
    path: 'form-autocomplete',
    meta: {
      title: 'Form Autocomplete'
    },
    component: () => import('../views/components/form-autocomplete/form-autocomplete-view.vue')
  },
  {
    path: 'form-input',
    meta: {
      title: 'Form Input'
    },
    component: () => import('../views/components/form-input/form-input-view.vue')
  },
  {
    path: 'form-select',
    meta: {
      title: 'Form Select'
    },
    component: () => import('../views/components/form-select/form-select-view.vue')
  },
  {
    path: 'form-checkbox',
    meta: {
      title: 'Form Checkbox'
    },
    component: () => import('../views/components/form-checkbox/form-checkbox-view.vue')
  },
  {
    path: 'form-switch',
    meta: {
      title: 'Form Switch'
    },
    component: () => import('../views/components/form-switch/form-switch-view.vue')
  },
  {
    path: 'form-radio',
    meta: {
      title: 'Form Radio'
    },
    component: () => import('../views/components/form-radio/form-radio-view.vue')
  },
  {
    path: 'form-date',
    meta: {
      title: 'Form Date'
    },
    component: () => import('../views/components/form-date/form-date-view.vue')
  },
  {
    path: 'collapse',
    meta: {
      title: 'Collapse'
    },
    component: () => import('../views/components/collapse/collapse-view.vue')
  },
  {
    path: 'dropdown',
    meta: {
      title: 'Drop Down'
    },
    component: () => import('../views/components/dropdown/dropdown-view.vue')
  },
  {
    path: 'toast',
    meta: {
      title: 'Toast'
    },
    component: () => import('../views/components/toast/toast-view.vue')
  },
  {
    path: 'table',
    meta: {
      title: 'Table'
    },
    component: () => import('../views/components/table/table-view.vue')
  },
  {
    path: 'pagination',
    meta: {
      title: 'Pagination'
    },
    component: () => import('../views/components/pagination/pagination-view.vue')
  }
]
