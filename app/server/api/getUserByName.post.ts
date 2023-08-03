import user from '../dbModels/user'

export default defineEventHandler(async (event) => {
  const { name } = await readBody(event)
  console.log('user data get for',name)
  const data = await user.findOne({ name })
  if (data) {
    const {
      name,
      title,
      bio,
      roomTimes,
    } = data
    return {
      ok: true,
      message:"here's the data you bozo",
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
      data: null,
      message: "user not found"
    }
  }
})

