import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: 'dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token') || ''
      if (token !== '') {
        next()
      } else {
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/pages/Users.vue'),
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('@/views/pages/Clients.vue'),
  },
  {
    path: '/doc-groups',
    name: 'doc-groups',
    component: () => import('@/views/pages/DocumentGroups.vue'),
  },
  {
    path: '/companies',
    name: 'companies',
    component: () => import('@/views/pages/Companies.vue'),
  },
  {
    path: '/company_types',
    name: 'company_types',
    component: () => import('@/views/pages/CompanyTypes.vue'),
  },
  {
    path: '/employees',
    name: 'employees',
    component: () => import('@/views/pages/Employees.vue'),
  },
  {
    path: '/documents',
    name: 'documents',
    component: () => import('@/views/pages/Documents.vue'),
  },
  {
    path: '/employeedocuments',
    name: 'employeedocuments',
    component: () => import('@/views/pages/EmployeeDocuments.vue'),
  },
  {
    path: '/typography',
    name: 'typography',
    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/table',
    name: 'simple-table',
    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form',
    name: 'form-layouts',
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/Login.vue'),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (!token) {
        next()
      } else {
        next({
          name: 'dashboard'
        })
      }
    },
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
