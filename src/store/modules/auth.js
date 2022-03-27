import axios from 'axios'

const state = {
  user: {},
}
const getters = {}
const actions = {
  async LogIn({}, User) {
    if (User.email !== '' || User.password !== '') {
      await axios.post('/login', {
        email: User.email,
        password: User.password,
      }).then((res) => {
        if (res.data.response.token) {
          localStorage.setItem('token', res.data.response.token)
          window.location.replace('/dashboard')
        }
      }).catch((error) => {
        alert("Invalid Credentials !")
      })
    }
    else {
      alert("Email and password required !")
    }
  },
  async LogOut({}) {
    await axios
      .post('/logout')
      .then(() => {
        localStorage.removeItem('token')
        window.location.replace('/login')
      })
      .catch((error) => {
        alert("Something Went Wrong !")
      })
  },
}
const mutations = {}
export default {
  state,
  getters,
  actions,
  mutations,
}
