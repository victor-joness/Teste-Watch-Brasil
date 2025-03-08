import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueFeather from 'vue-feather'
import PageHeaderVue from './components/ui/PageHeader.vue'
import Icon from '@/components/ui/Icon.vue'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true
})

app.component(VueFeather.name, VueFeather)
app.component('PageHeader', PageHeaderVue)
app.component('Icon', Icon)
app.use(createPinia())
app.use(router)

app.mount('#app')
