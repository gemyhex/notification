import axios from 'axios'

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
  getDialog() {
    return state.login.dialoge
  },
}
const actions = {
  async LogIn({
    state,
  }, User) {
    if (User.email == '' || User.password == '') {
      state.login.error = 'Check your email and password !'
      state.login.dialoge = true
      console.log(state.login.dialoge)
    } else {
      state.login.loading = true
      await axios.post('/login', {
        email: User.email,
        password: User.password,
      }).then(res => {
        console.log('login res => ', res)
        if (res.data.response.token) {
          state.login.loading = false
          localStorage.setItem('token', res.data.response.token)
          window.location.replace('/dashboard')
        } else {
          state.login.dialoge = true
          state.login.error = 'Invalid Credentials !'
          state.login.loading = false
        }
      })
    }
  },
  LogOut({}) {
    axios
      .post('/logout')
      .then(() => {
        localStorage.removeItem('token')
        window.location.replace('/login')
      })
      .catch(error => {
        localStorage.removeItem('token')
        window.location.replace('/login')
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
