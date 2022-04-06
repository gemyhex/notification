import router from './router'
import store from './store'
import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import axios from 'axios'
import {
  BootstrapVue,
  IconsPlugin,
} from 'bootstrap-vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import i18n from './i18n'

const lang = localStorage.getItem('lang') || 'en'
axios.defaults.baseURL = 'http://localhost/notification/public/api/'
// axios.defaults.baseURL = 'https://notif-back.smarttechno.co/api/'
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
axios.defaults.headers['Accept-Language'] = lang
document.documentElement.lang = lang

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)

const vm = new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
export {
  vm
}
