import user from '../dbModels/user'

export default defineEventHandler(async (event) => {
  console.log('user data get')
  const { id } = await readBody(event)
  const data = await user.findById(id)
  if (data) {
    const {
      name,
      title,
      bio,
      roomTimes,
    } = data
    return {
      ok: true,
      data: {
        name,
        title,
        bio,
        roomTimes,
      }
    }
  } else {
    return {
      ok: false,
      data: null
    }
  }
})

