export default defineEventHandler(async (event) => {
  const {password} =await readBody(event)
  return useRuntimeConfig().adminPassword === password
})