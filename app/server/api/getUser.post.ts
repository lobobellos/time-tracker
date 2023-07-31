import user from '../dbModels/user'

export default defineEventHandler(async (event) => {
  console.log('user data get')
  const { id } = await readBody(event)
  const data = await user.findOne({
    _id:id
  })

  if(data){
    const  {
      pin,
      ...newData
    } = data
    return {
      ok:true,
      data:newData
    }
  }else{
    return{
      ok:false,
      data:null
    }
  }
})

