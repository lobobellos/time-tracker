import { changeName } from "../dataManager";

export default defineEventHandler(async (event) => {
  let {pin, newName} =<changeNameInfo> await readBody(event);
  try {
    await changeName(pin,newName);
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


