import user from '../../dbModels/user'

export default defineEventHandler(async (event) => {
  const { password } = await readBody(event)
  console.log('dropping')
  if (password === useRuntimeConfig().adminPassword) {
    await user.deleteMany({})
    return {
      ok: true,
    }
  } else {
    return {
      ok: false
    }
  }
})