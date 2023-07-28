import { addUser } from "../dataManager";

export default defineEventHandler(async (event) => {
  const {pin, name, title} = await readBody(event)
  console.log("now account creation occuring", pin, name, title)
  try{
    await addUser(pin, name, title);
    setCookie(event, "pin", pin)
    return {
      ok: true,
      message: "account created"
    }
  }catch(err){
    return {
      ok: false,
      message: String(err)
    }
  }
  
})
