import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import './style.css'
import App from './App.vue'


import CreateAcct from './pages/CreateAcct.vue'
import Home from './pages/Home.vue'

const routes = [
 {path:'/', component: Home},
 {path:'/createAcct', component: CreateAcct}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

let app = createApp(App)
app.use(router)

app.mount('#app')
