import axios from 'axios'
import {
  vm
} from '../../main'

const state = {
  user: {},
  login: {
    error: 'Something Went Wrong , Try again !',
    loading: false,
    dialoge: false,
  },
}
const getters = {
  getError(state) {
    return state.login.error
  },
  getState(state) {
    return state.login.loading
  },
  getDialog(state) {
    return state.login.dialoge
  },
  getUser(state) {
    return state.user
  }
}
const actions = {
  async LogIn({
    state,
  }, User) {
    state.login.loading = true
    await axios.post('/login', {
      email: User.email,
      password: User.password,
    }).then(res => {
      if (res.data.response.token) {
        state.login.loading = false
        localStorage.setItem('token', res.data.response.token)
        localStorage.setItem('userid', res.data.response.user.id)
        localStorage.setItem('clientid', res.data.response.user.client_id)
        window.location.replace('/')
      } else {
        state.login.loading = false
        state.login.dialoge = true
        state.login.error = 'Invalid Credentials !'
      }
    }).catch((error) => {
      state.login.loading = false
      state.login.dialoge = true
      state.login.error = 'Invalid Credentials !'
    })
  },
  LogOut({}) {
    axios
      .post('/logout')
      .then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('userid')
        localStorage.removeItem('clientid')
        window.location.replace('/login')
        state.user = {}
      })
      .catch(error => {
        localStorage.removeItem('token')
        localStorage.removeItem('userid')
        localStorage.removeItem('clientid')
        window.location.replace('/login')
        state.user = {}
      })
  },
}
const mutations = {
  DialogApperence(state, payload) {
    state.login.dialoge = payload
  },
}
export default {
  state,
  getters,
  actions,
  mutations,
}
