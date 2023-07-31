import users from "../../dbModels/user"

export default defineEventHandler(async (event) => {
  const { pin, time } = await readBody(event)
  console.log('time being added', pin, time)
  try {
    users.findOneAndUpdate(
      { pin },
      { $push: { roomTimes: time } },
    )
    return {
      ok: true,
    }
  } catch (err) {
    console.log(err)
    return {
      ok: false,
    }
  }
})