<template>
  <v-fade-transition mode="out-in">
    <v-icon
      :key="$vuetify.theme.dark"
      @click="changeTheme"
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      title="Switch Theme"
      class="mx-3"
    >
      {{ $vuetify.theme.dark ? icons.mdiWeatherSunny : icons.mdiWeatherNight }}
    </v-icon>
  </v-fade-transition>
</template>

<script>
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'

export default {
  setup() {
    const dark = localStorage.getItem('dark') || false

    return {
      icons: {
        mdiWeatherNight,
        mdiWeatherSunny,
      },
      dark,
    }
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('dark', this.$vuetify.theme.dark)
      // window.location.reload()
    },
  },
}
</script>

<style></style>
