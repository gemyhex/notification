<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <v-img
              :src="require('@/assets/images/logos/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">Materio</h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">Adventure starts here 🚀</p>
          <p class="mb-2">Make your app management easy and fun!</p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form @submit.prevent="onSignUp">
            <v-row>
              <v-col>
                <label id="lbl_inp" for="group">Username <span class="text-danger">*</span></label>
                <v-text-field
                  v-model="$v.user.username.$model"
                  outlined
                  label="Username"
                  placeholder="Username"
                  hide-details
                  :class="{ 'is-invalid': validateStatus($v.user.username), 'mt-3': true }"
                ></v-text-field>
                <div v-if="!$v.user.username.required" class="invalid-feedback">The username field is required.</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <label id="lbl_inp" for="group">Email <span class="text-danger">*</span></label>
                <v-text-field
                  v-model="$v.user.email.$model"
                  outlined
                  label="Email"
                  placeholder="john@example.com"
                  hide-details
                  :class="{ 'is-invalid': validateStatus($v.user.email), 'mt-3': true }"
                ></v-text-field>
                <div v-if="!$v.user.email.required" class="invalid-feedback">The email field is required.</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <label id="lbl_inp" for="group">Password <span class="text-danger">*</span></label>
                <v-text-field
                  v-model="$v.user.password.$model"
                  outlined
                  :type="isPasswordVisible ? 'text' : 'password'"
                  label="Password"
                  placeholder="············"
                  :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                  hide-details
                  @click:append="isPasswordVisible = !isPasswordVisible"
                  :class="{ 'is-invalid': validateStatus($v.user.email), 'mt-3': true }"
                ></v-text-field>
                <div v-if="!$v.user.password.required" class="invalid-feedback">The password field is required.</div>
                <div v-if="!$v.user.password.minLength" class="invalid-feedback">
                  You must have at least {{ $v.user.password.$params.minLength.min }} characters.
                </div>
              </v-col>
            </v-row>

            <v-checkbox hide-details class="mt-1">
              <template #label>
                <div class="d-flex align-center flex-wrap">
                  <span class="me-2">I agree to</span><a href="javascript:void(0)">privacy policy &amp; terms</a>
                </div>
              </template>
            </v-checkbox>

            <v-btn v-if="!isLoading" type="submit" block color="primary" class="mt-6"> Signup </v-btn>
            <v-btn v-else type="submit" block color="primary" class="mt-6">
              <button class="btn" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Please Wait...
              </button>
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2"> Already have an account? </span>
          <router-link :to="{ name: 'login' }"> Sign in instead </router-link>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="190"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
    />

    <!-- tree -->
    <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png"></v-img>

    <!-- tree  -->
    <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png"></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import axios from 'axios'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      isLoading: false,
      isPasswordVisible: false,
      user: {
        email: null,
        password: null,
        username: null,
      },
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  methods: {
    validateStatus(validation) {
      return typeof validation != 'undefined' ? validation.$error : false
    },
    async onSignUp() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.isLoading = true
        await axios
          .post('/register', this.user)
          .then(() => {
            this.isLoading = false
            this.$router.push('/login')
          })
          .catch(err => {
            console.log(err)
          })
      }
    },

    // ...mapActions(['Register']),
    // async onSignUp() {
    //   try {
    //     await this.Register(this.user)
    //     this.$router.push('/')
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
  },
  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength(8) },
      username: { required },
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
