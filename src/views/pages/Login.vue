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

                <h2 class="text-2xl font-weight-semibold">{{ $t('Dashboard') }}</h2>
              </router-link>
            </v-card-title>

            <!-- title -->
            <v-card-text>
              <p class="text-2xl font-weight-semibold text--primary mb-2">
                {{ $t('msgs.welcome') }} {{ $t('Dashboard') }}! 👋🏻
              </p>
              <p class="mb-2">{{ $t('msgs.signin') }}</p>
            </v-card-text>

            <!-- login form -->
            <v-card-text>
              <v-form @submit.prevent="onLogin">
                <v-row>
                  <v-col>
                    <label id="lbl_inp" for="group">{{ $t('forms.email') }} <span class="text-danger">*</span></label>
                    <v-text-field
                      v-model="$v.user.email.$model"
                      outlined
                      placeholder="john@example.com"
                      hide-details
                      :class="{ 'is-invalid': validateStatus($v.user.email), 'mt-3': true }"
                    ></v-text-field>
                    <div v-if="!$v.user.email.required" class="invalid-feedback">{{ $t('auths.email') }}.</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <label id="lbl_inp" for="group"
                      >{{ $t('forms.password') }} <span class="text-danger">*</span></label
                    >
                    <v-text-field
                      v-model="$v.user.password.$model"
                      outlined
                      :type="isPasswordVisible ? 'text' : 'password'"
                      placeholder="············"
                      :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                      hide-details
                      @click:append="isPasswordVisible = !isPasswordVisible"
                      :class="{ 'is-invalid': validateStatus($v.user.email), 'mt-3': true }"
                    ></v-text-field>
                    <div v-if="!$v.user.password.required" class="invalid-feedback">{{ $t('auths.password') }}.</div>
                    <div v-if="!$v.user.password.minLength" class="invalid-feedback">
                      {{ $t('auths.passLess', { pass: $v.user.password.$params.minLength.min }) }}.
                    </div>
                  </v-col>
                </v-row>

                <div class="d-flex align-center justify-space-between flex-wrap">
                  <v-checkbox :label="$t('btns.remember')" hide-details class="me-3 mt-1"> </v-checkbox>

                  <!-- forgot link -->
                  <router-link to="/" class="mt-1"> {{ $t('btns.forgot_password') }} </router-link>
                </div>

                <v-btn v-if="!getState" type="submit" block color="primary" class="mt-6">
                  {{ $t('btns.login') }}
                </v-btn>
                <v-btn v-else type="submit" block color="primary" class="mt-6">
                  <button class="btn" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {{ $t('btns.wait') }}...
                  </button>
                </v-btn>
              </v-form>
            </v-card-text>

            <!-- create new account  -->
            <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
              <span class="me-2"> {{ $t('msgs.new') }} </span>
              <router-link :to="{ name: 'register' }"> {{ $t('btns.register') }} </router-link>
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
                <li class="py-1 my-3 text-center d-flex text-center">
                  <v-chip color="error" small>{{ 1 }}</v-chip>
                  <p class="m-0 px-3">{{ getError }}</p>
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
import { required, minLength } from 'vuelidate/lib/validators'

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
    getUser() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    validateStatus(validation) {
      return typeof validation != 'undefined' ? validation.$error : false
    },
    onLogin() {
      this.$store.dispatch('LogIn', this.user)
    },
    CloseDialog() {
      this.$store.commit('DialogApperence', false)
    },
  },
  validations: {
    user: {
      email: { required },
      password: { required, minLength: minLength(8) },
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
