import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import preset from './default-preset/preset'
import en from '../../assets/i18n/en.json'
import ar from '../../assets/i18n/ar.json'

Vue.use(Vuetify)

export default new Vuetify({
  preset,
  rtl: localStorage.getItem('rtl'),
  icons: {
    iconfont: 'mdiSvg',
  },
  lang: {
    locales: {
      en,
      ar,
    },
    current: localStorage.getItem('lang'),
  },
  theme: {
    dark: true,
    options: {
      customProperties: true,
      variations: false,
    },
  },
})
