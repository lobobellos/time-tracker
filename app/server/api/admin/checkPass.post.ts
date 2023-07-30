export default defineEventHandler(async (event) => {
  const {password} =await readBody(event)
  console.log('checking pass')
  return useRuntimeConfig().adminPassword === password
})