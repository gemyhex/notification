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

            <h2 class="text-2xl font-weight-semibold">Dashboard</h2>
          </router-link>
        </v-card-title>

        <!-- login form -->
        <v-card-text>
          <v-form @submit.prevent="onSignUp">
            <v-row>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col>
                    <label id="lbl_inp" for="group">Name <span class="text-danger">*</span></label>
                    <v-text-field
                      v-model="$v.user.name.$model"
                      outlined
                      placeholder="Name"
                      hide-details
                      :class="{ 'is-invalid': validateStatus($v.user.name), 'mt-3': true }"
                    ></v-text-field>
                    <div v-if="!$v.user.name.required" class="invalid-feedback">The name field is required.</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <label id="lbl_inp" for="group">Phone <span class="text-danger">*</span></label>
                    <v-text-field
                      type="number"
                      v-model="$v.user.phone.$model"
                      outlined
                      placeholder="Phone"
                      hide-details
                      :class="{ 'is-invalid': validateStatus($v.user.phone), 'mt-3': true }"
                    ></v-text-field>
                    <div v-if="!$v.user.phone.required" class="invalid-feedback">The phone field is required.</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <label id="lbl_inp" for="group">Address <span class="text-danger">*</span></label>
                    <v-text-field
                      v-model="$v.user.address.$model"
                      outlined
                      placeholder="address"
                      hide-details
                      :class="{ 'is-invalid': validateStatus($v.user.address), 'mt-3': true }"
                    ></v-text-field>
                    <div v-if="!$v.user.address.required" class="invalid-feedback">The address field is required.</div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col>
                    <label id="lbl_inp" for="group">Username <span class="text-danger">*</span></label>
                    <v-text-field
                      v-model="$v.user.username.$model"
                      outlined
                      placeholder="Username"
                      hide-details
                      :class="{ 'is-invalid': validateStatus($v.user.username), 'mt-3': true }"
                    ></v-text-field>
                    <div v-if="!$v.user.username.required" class="invalid-feedback">
                      The username field is required.
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <label id="lbl_inp" for="group">Email <span class="text-danger">*</span></label>
                    <v-text-field
                      v-model="$v.user.email.$model"
                      outlined
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
                      placeholder="············"
                      :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                      hide-details
                      @click:append="isPasswordVisible = !isPasswordVisible"
                      :class="{ 'is-invalid': validateStatus($v.user.password), 'mt-3': true }"
                    ></v-text-field>
                    <div v-if="!$v.user.password.required" class="invalid-feedback">
                      The password field is required.
                    </div>
                    <div v-if="!$v.user.password.minLength" class="invalid-feedback">
                      You must have at least {{ $v.user.password.$params.minLength.min }} characters.
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-checkbox hide-details class="mt-1">
                  <template #label>
                    <div class="d-flex align-center flex-wrap">
                      <span class="me-2">I agree to</span><a href="javascript:void(0)">privacy policy &amp; terms</a>
                    </div>
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>

            <v-btn v-if="!isLoading" type="submit" block color="primary" class="mt-6"> Signup </v-btn>
            <v-btn v-else type="submit" block color="primary" class="mt-6">
              <button class="btn" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Please Wait...
              </button>
            </v-btn>
          </v-form>
        </v-card-text>
        <v-row justify="space-around">
          <v-col>
            <v-dialog v-model="errorDialog" max-width="350">
              <v-card>
                <v-card-title class="text-h4">
                  <v-icon size="50">
                    {{ icons.mdiAlertCircleOutline }}
                  </v-icon>
                  <span>Oops !</span>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-card-text>
                  <ul>
                    <li v-for="(err, i, idx) in errorsLog" :key="i" class="py-1 my-3 text-center d-flex text-center">
                      <v-chip color="error" small>{{ idx + 1 }}</v-chip>
                      <p class="m-0 px-3">{{ err[0] }}</p>
                    </li>
                  </ul>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error lighten-1" text @click="errorDialog = false"> Close </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
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
      errorsLog: { err: [''] },
      errorDialog: false,
      user: {
        email: null,
        password: null,
        username: null,
        name: null,
        phone: null,
        address: null,
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
          .catch(error => {
            if (error.response.data.errors) {
              this.errorsLog = error.response.data.errors
            } else {
              this.errorsLog = { err: ['Can not register now !'] }
            }
            this.errorDialog = true
          })
      }
    },
  },
  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength(8) },
      username: { required },
      name: { required },
      phone: { required },
      address: { required },
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
