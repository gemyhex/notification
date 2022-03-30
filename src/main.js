import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import axios from 'axios'
import {
  BootstrapVue,
  IconsPlugin,
} from 'bootstrap-vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'

axios.defaults.baseURL = 'https://notif-back.smarttechno.co/api/'
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
