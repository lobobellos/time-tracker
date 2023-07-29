import { getUser } from "../dataManager";

export default defineEventHandler(async (event) => {
  const {pin} =await readBody(event)
  const data = await getUser(pin);
  return {
    data
  }
})

