import users from '../../dbModels/user'

export default defineEventHandler(async (event) => {
  const { id, newBio } = await readBody(event);
  try {
    await users.findByIdAndUpdate(id, { bio: newBio })
    return {
      ok: true,
      message: "name changed"
    }
  } catch (err) {
    return {
      ok: false,
      message: String(err)
    }
  }
})


