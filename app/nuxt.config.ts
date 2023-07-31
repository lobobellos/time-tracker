import {config} from 'dotenv'
config()

function err(name:string):never{
  throw new Error(name)
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //devtools: { enabled: true },
  routeRules: {
    '*': {ssr: false}
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL ?? err('MONGO_URL is undefined'),
    adminPassword : process.env.ADMIN_PASSWORD ?? err('ADMIN_PASSWORD is undefined')
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },
})
