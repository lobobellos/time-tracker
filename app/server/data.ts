export default defineEventHandler(async (event) => {
  console.log(event)
  return [1,2,3,4]
})