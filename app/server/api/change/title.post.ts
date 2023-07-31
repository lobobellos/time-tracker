import users from '../../dbModels/user'

export default defineEventHandler(async (event) => {
  console.log('title change request')
  const { id, newTitle } = await readBody(event)
  try {
    await users.findByIdAndUpdate(id, { title: newTitle })
    return {
      ok: true,
      message: "title changed"
    }
  } catch (err) {
    return {
      ok: false,
      message: String(err)
    }
  }
})
