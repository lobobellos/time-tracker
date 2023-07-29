import { changeTitle } from "../dataManager";

export default defineEventHandler(async (event) => {
  console.log('title change request')
  const { pin, newTitle } = <changeTitleInfo>await readBody(event)
  try {
    await changeTitle(pin, newTitle);
    return{
      ok: true,
      message: "title changed"
    }
  } catch (err) {
    return{
      ok: false,
      message: String(err)
    }
  }
})
