import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import './style.css'
import App from './App.vue'

import CreateAcct from './pages/CreateAcct.vue'
import Home from './pages/Home.vue'
import Admin from './pages/Admin.vue'
import MyAcct from './pages/MyAcct.vue'
import Login from './pages/Login.vue'

const routes = [
 {path:'/', component: Home},
 {path:'/createAcct', component: CreateAcct},
 {path:'/admin', component: Admin},
 {path:'/myAcct', component: MyAcct},
 {path:'/login', component: Login},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)

app.mount('#app')
