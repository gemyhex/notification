<template>
  <v-app app flat absolute color="transparent">
    <div class="side position-absolute top-0 ">
      <div class="d-flex align-center justify-end mx-6 pb-5 pt-2">
        <theme-switcher></theme-switcher>
        <language-switcher></language-switcher>
      </div>
    </div>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

export default {
  components: {
    ThemeSwitcher,
    LanguageSwitcher,
  },
}
</script>

<style>
.side {
  z-index: 9999;
}
</style>
