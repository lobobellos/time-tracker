import users from '../../dbModels/user'

export default defineEventHandler(async (event) => {
  console.log("pin being changed")
  let { id, newPin } = await readBody(event);
  try {
    if (await users.findOne({ pin: newPin })) return {
      ok: false,
      message: 'that pin already exists!'
    }
    await users.findByIdAndUpdate(id, { pin: newPin })
    return {
      ok: true,
      message: 'pin changed successfully'
    }
  } catch (err) {
    return {
      ok: false,
      message: String(err)
    }
  }
})
