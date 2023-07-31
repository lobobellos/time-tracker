import users from "../dbModels/user"

export default defineEventHandler(async (event) => {
  console.log('user login request')
  const { pin } = await readBody(event)

  const data = await users.findOne({
    pin,
  });
  if (data) {
    setCookie(event, "id", data._id.toString())
    console.log('id set', data._id.toString())
    return {
      ok: true,
      message: "login successful"
    }
  }else{
    return {
      ok: false,
      message: "login failed"
    }
  }

})
