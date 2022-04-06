<template>
  <div>
    <v-icon>{{ icons.mdiWebBox }}</v-icon>
    <!-- <v-icon @click="handleChange">{{ isAr == true ? icons.mdiAbjadArabic : icons.mdiAlphaE }}</v-icon> -->
    <select name="langs" id="langSwitch" class="custom-select" v-model="lang" @change="handlerChange($event)">
      <option value="en">En</option>
      <option value="ar">ع</option>
    </select>
  </div>
</template>

<script>
import { mdiWebBox, mdiAbjadArabic, mdiAlphaE } from '@mdi/js'
export default {
  data() {
    const lang = localStorage.getItem('lang') || 'en'

    return {
      lang,
      isAr: false,
      icons: {
        mdiWebBox,
        mdiAbjadArabic,
        mdiAlphaE,
      },
    }
  },
  methods: {
    handleChange() {
      if (this.lang == 'en') {
        localStorage.setItem('lang', 'ar')
        localStorage.removeItem('rtl')
        this.isAr = true
      } else {
        localStorage.setItem('lang', 'en')
        localStorage.setItem('rtl', true)
        this.isAr = false
      }
      window.location.reload()
    },
    handlerChange(event) {
      localStorage.setItem('lang', event.target.value)
      this.$vuetify.lang.current = event.target.value
      console.log(this.lang)
      if (this.lang == 'en') {
        localStorage.removeItem('rtl')
      } else {
        localStorage.setItem('rtl', true)
      }
      window.location.reload()
    },
  },
}
</script>

<style>
.custom-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 50px;
  /* background: #fff url('select-arrows.svg') no-repeat right 16px center; */
  /* border: 1px solid #ddd; */
  outline: none;
  border-radius: 3px;
  color: #999;
}
/* remove default arrow in IE */
select::-ms-expand {
  display: none;
}
</style>