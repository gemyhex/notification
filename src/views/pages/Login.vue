<template>
  <div>
    <v-row>
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

                <h2 class="text-2xl font-weight-semibold">Dashboard</h2>
              </router-link>
            </v-card-title>

            <!-- title -->
            <v-card-text>
              <p class="text-2xl font-weight-semibold text--primary mb-2">Welcome to Dashboard! 👋🏻</p>
              <p class="mb-2">Please sign-in to your account and start the adventure</p>
            </v-card-text>

            <!-- login form -->
            <v-card-text>
              <v-form @submit.prevent="onLogin">
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
                    <div v-if="!$v.user.password.required" class="invalid-feedback">
                      The password field is required.
                    </div>
                    <div v-if="!$v.user.password.minLength" class="invalid-feedback">
                      You must have at least {{ $v.user.password.$params.minLength.min }} characters.
                    </div>
                  </v-col>
                </v-row>

                <div class="d-flex align-center justify-space-between flex-wrap">
                  <v-checkbox label="Remember Me" hide-details class="me-3 mt-1"> </v-checkbox>

                  <!-- forgot link -->
                  <router-link to="/" class="mt-1"> Forgot Password? </router-link>
                </div>

                <v-btn v-if="!getState" type="submit" block color="primary" class="mt-6"> Login </v-btn>
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
              <span class="me-2"> New on our platform? </span>
              <router-link :to="{ name: 'register' }"> Create an account </router-link>
            </v-card-text>
          </v-card>
        </div>

        <!-- background triangle shape  -->
        <img
          class="auth-mask-bg"
          height="173"
          :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
        />

        <!-- tree -->
        <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png"></v-img>

        <!-- tree  -->
        <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png"></v-img>
      </div>
    </v-row>
    <v-row justify="space-around">
      <v-col>
        <v-dialog v-model="getDialog" max-width="350">
          <v-card>
            <v-card-title class="text-h5">
              <v-icon size="40">
                {{ icons.mdiAlertCircleOutline }}
              </v-icon>
              Oops!
            </v-card-title>
            <v-card-text>
              <ul>
                <li class="py-3 primary text-center" dark>
                  {{ getError }}
                </li>
              </ul>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="CloseDialog"> Close </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline, mdiAlertCircleOutline } from '@mdi/js'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      isPasswordVisible: false,
      isLoading: false,
      errorDialog: false,
      error: '',
      user: {
        email: null,
        password: null,
      },
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
        mdiAlertCircleOutline,
      },
    }
  },
  computed: {
    getState() {
      return this.$store.state.auth.login.loading
    },
    getError() {
      return this.$store.state.auth.login.error
    },
    getDialog() {
      return this.$store.state.auth.login.dialoge
    },
  },
  methods: {
    validateStatus(validation) {
      return typeof validation != 'undefined' ? validation.$error : false
    },
    onLogin() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$store.dispatch('LogIn', this.user)
      }
    },
    CloseDialog() {
      this.$store.commit('DialogApperence', false)
    },
  },
  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength(8) },
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
