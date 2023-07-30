import {config} from 'dotenv'
config()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //devtools: { enabled: true },
  routeRules: {
    '*': {ssr: false}
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
    adminPassword : process.env.ADMIN_PASSWORD
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },
})
