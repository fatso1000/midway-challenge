import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'es-AR',
  messages: {},
  numberFormats: {
    'es-AR': {
      currency: {
        style: 'currency',
        currency: 'ARS',
        notation: 'compact',
      },
      decimal: {
        style: 'decimal',
        maximumFractionDigits: 2,
        notation: 'compact',
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: false,
      },
    },
  },
  datetimeFormats: {
    'es-AR': {
      compact: {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      },
    },
  },
})
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VueApexCharts)

app.mount('#app')
