<template>
  <v-fade-transition mode="out-in">
    <v-icon
      :key="$vuetify.theme.dark"
      @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      data-bs-toggle="tooltip" data-bs-placement="bottom" title="Switch Theme"
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
    return {
      icons: {
        mdiWeatherNight,
        mdiWeatherSunny,
      },
    }
  },
}
</script>

<style>
</style>
