import './assets/main.css'
import './assets/style.css'
import './assets/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'

import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import Ripple from 'primevue/ripple'
import AppState from './plugins/appState'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import MyPreset from './plugins/mytheme'

import VueApexCharts from "vue3-apexcharts";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(AppState)
app.use(PrimeVue, {
	theme: {
		preset: MyPreset,
		options: {
			darkModeSelector: '.p-dark',
			cssLayer: {
				name: 'primevue',
				order: 'tailwind-base, primevue, tailwind-utilities',
			},
			ripple: true,
		},
	},
})
app.use(ToastService)
app.use(ConfirmationService)
app.directive('ripple', Ripple)
app.component('ThemeSwitcher', ThemeSwitcher)
app.component('ApexChart', VueApexCharts)
app.mount('#app')
