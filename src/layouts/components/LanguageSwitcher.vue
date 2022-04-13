<template>
  <div>
    <!-- <v-icon>{{ icons.mdiWebBox }}</v-icon> -->
    <v-icon @click="handleChange" size="26">{{ lang == 'ar' ? icons.mdiWeb : icons.mdiWeb }}</v-icon>
    <!-- <select name="langs" id="langSwitch" class="custom-select" v-model="lang" @change="handlerChange($event)">
      <option value="en" selected>English</option>
      <option value="ar">عربي</option>
    </select> -->
  </div>
</template>

<script>
import { mdiWeb, mdiAbjadArabic, mdiAlphaEBox, mdiTranslate } from '@mdi/js'
export default {
  data() {
    const lang = localStorage.getItem('lang') || 'en'

    return {
      lang,
      isAr: false,
      icons: {
        mdiWeb,
        mdiAbjadArabic,
        mdiAlphaEBox,
        mdiTranslate,
      },
    }
  },
  methods: {
    handleChange() {
      if (this.lang == 'en') {
        localStorage.setItem('lang', 'ar')
        localStorage.setItem('rtl', true)
        this.isAr = true
      } else {
        localStorage.setItem('lang', 'en')
        localStorage.removeItem('rtl')
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