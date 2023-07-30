import Global from "../../Global"

export default defineEventHandler(async (event) => {
  const {password} =await readBody(event)
  return Global.adminPassword === password
})