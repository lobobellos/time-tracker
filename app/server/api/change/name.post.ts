import users from '../../dbModels/user'

export default defineEventHandler(async (event) => {
  const {id, newName} = await readBody(event);
  try {
    await users.findByIdAndUpdate(id,{name:newName})
    return{
      ok: true,
      message: "name changed"
    }
  } catch (err) {
    return{
      ok: false,
      message: String(err)
    }
  }
})


