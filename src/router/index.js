import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index";

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
      const user = store.state.user
      // const token = localStorage.getItem('token') || ''
      if (user !== null) {
        next()
      } else {
        next({
          name: 'login',
        })
      }
    },
  },
  {
    path: '/roles',
    name: 'roles',
    component: () => import('@/views/pages/Roles.vue'),
    beforeEnter: (to, from, next) => {
      const user = store.state.user
      // const token = localStorage.getItem('token') || ''
      if (user !== null) {
        next()
      } else {
        next({
          name: 'login',
        })
      }
    },
  },
  {
    path: '/permissions',
    name: 'permissions',
    component: () => import('@/views/pages/Permissions.vue'),
    beforeEnter: (to, from, next) => {
      const user = store.state.user
      // const token = localStorage.getItem('token') || ''
      if (user !== null) {
        next()
      } else {
        next({
          name: 'login',
        })
      }
    },
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('@/views/pages/Clients.vue'),
    beforeEnter: (to, from, next) => {
      const user = store.state.user
      // const token = localStorage.getItem('token') || ''
      if (user !== null) {
        next()
      } else {
        next({
          name: 'login',
        })
      }
    },
  },
  {
    path: '/doc-groups',
    name: 'doc-groups',
    component: () => import('@/views/pages/DocumentGroups.vue'),
    beforeEnter: (to, from, next) => {
      const user = store.state.user
      // const token = localStorage.getItem('token') || ''
      if (user !== null) {
        next()
      } else {
        next({
          name: 'login',
        })
      }
    },
  },
  {
    path: '/companies',
    name: 'companies',
    component: () => import('@/views/pages/Companies.vue'),
    beforeEnter: (to, from, next) => {
      const user = store.state.user
      // const token = localStorage.getItem('token') || ''
      if (user !== null) {
        next()
      } else {
        next({
          name: 'login',
        })
      }
    },
  },
  {
    path: '/company_types',
    name: 'company_types',
    component: () => import('@/views/pages/CompanyTypes.vue'),
    beforeEnter: (to, from, next) => {
      const user = store.state.user
      // const token = localStorage.getItem('token') || ''
      if (user !== null) {
        next()
      } else {
        next({
          name: 'login',
        })
      }
    },
  },
  {
    path: '/employees',
    name: 'employees',
    component: () => import('@/views/pages/Employees.vue'),
    beforeEnter: (to, from, next) => {
      const user = store.state.user
      // const token = localStorage.getItem('token') || ''
      if (user !== null) {
        next()
      } else {
        next({
          name: 'login',
        })
      }
    },
  },
  {
    path: '/documents',
    name: 'documents',
    component: () => import('@/views/pages/Documents.vue'),
    beforeEnter: (to, from, next) => {
      const user = store.state.user
      // const token = localStorage.getItem('token') || ''
      if (user !== null) {
        next()
      } else {
        next({
          name: 'login',
        })
      }
    },
  },
  {
    path: '/employeedocuments',
    name: 'employeedocuments',
    component: () => import('@/views/pages/EmployeeDocuments.vue'),
    beforeEnter: (to, from, next) => {
      const user = store.state.user
      // const token = localStorage.getItem('token') || ''
      if (user !== null) {
        next()
      } else {
        next({
          name: 'login',
        })
      }
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/Login.vue'),
    beforeEnter: (to, from, next) => {
      let user = store.state.user
      // const token = localStorage.getItem('token')
      if (user == null) {
        next()
      } else {
        next({
          name: 'dashboard',
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
