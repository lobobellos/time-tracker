import { changeName } from "../dataManager";

export default defineEventHandler(async (event) => {
  let {pin, newName} =<changeNameInfo> await readBody(event);
  try {
    await changeName(pin,newName);
    setResponseStatus(event, 201);
  } catch (err) {
    console.log(err);
    setResponseStatus(event, 400);
    return err
  }
})


