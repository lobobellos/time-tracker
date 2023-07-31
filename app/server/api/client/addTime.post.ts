import users from "../../dbModels/user"

export default defineEventHandler(async (event) => {
  const { pin, time } = await readBody(event)
  console.log('time being added', pin, time)
  try {
    const data = await users.findOneAndUpdate(
      { pin },
      { $push: { roomTimes: time } },
    )
    return {
      ok: true,
      message: data
    }
  } catch (err) {
    console.log(err)
    return {
      ok: false,
    }
  }
})