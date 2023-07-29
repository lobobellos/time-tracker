import { getParsedData } from '../dataManager'

export default defineEventHandler (async (event) => {
  console.log('data request')
  return await getParsedData()
})