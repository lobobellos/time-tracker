import { getRawData } from "../dataManager";

export default defineEventHandler(async (event) => {
  console.log('user login request')
  const { pin } = await readBody(event)

  const data = (await getRawData())
    .find(el => el[0] == pin)
  if (data) {
    setCookie(event, "pin", pin)
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
