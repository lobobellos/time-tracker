import { config } from 'dotenv'
config()
import Client from '@replit/database'

export default class Global {
  static readonly db = new Client(process.env?.REPLIT_DB_URL ?? Global.err('REPLIT_DB_URL is not defined')) 
  static readonly adminPassword = process.env.ADMIN_PASSWORD ?? Global.err('ADMIN_PASSWORD is not defined')

  private static err(msg:string):never{
    throw new Error(msg)
  }
}