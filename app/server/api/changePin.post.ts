import { changeUserPin } from "../dataManager";

export default defineEventHandler(async (event) => {
  console.log("pin being changed")
  
  let {pin, newPin} =  await readBody(event);
  try {
    await changeUserPin(pin, newPin);
    setResponseStatus(event, 201);
  } catch (err) {
    console.log(err);
    setResponseStatus(event, 400);
    return err
  }
})
