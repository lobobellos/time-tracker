import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import './style.css'
import App from './App.vue'

import CreateAcct from './pages/CreateAcct.vue'
import Home from './pages/Home.vue'
import LookByDay from './pages/LookByDay.vue'
import MyAcct from './pages/MyAcct.vue'

const routes = [
 {path:'/', component: Home},
 {path:'/createAcct', component: CreateAcct},
 {path:'/lookByDay', component: LookByDay},
 {path:'/myAcct', component: MyAcct},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)

app.mount('#app')
