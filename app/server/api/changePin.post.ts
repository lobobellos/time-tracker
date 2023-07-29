import { changeUserPin } from "../dataManager";

export default defineEventHandler(async (event) => {
  console.log("pin being changed")
  let {pin, newPin} = await readBody(event);
  try {
    await changeUserPin(pin, newPin);
    setCookie(event, "pin", newPin)
    return {
      ok:true,
      message:'pin changed successfully'
    }
  } catch (err) {
    return{
      ok:false,
      message: String(err)
    }
  }
})
