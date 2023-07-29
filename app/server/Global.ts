import { config } from 'dotenv'
config()
import Client from '@replit/database'

export default class Global {
  private static _db = new Client(process.env?.REPLIT_DB_URL ?? Global.err('REPLIT_DB_URL is not defined')) 
  private static _adminPassword = process.env.ADMIN_PASSWORD ?? Global.err('ADMIN_PASSWORD is not defined')

  static get db() {
    return Global._db
  }
  static set db(db) {
    throw new Error('cannot set this property')
  }
  static get adminPassword() {
    return Global._adminPassword
  }
  static set adminPassword(adminPassword) {
    throw new Error('cannot set this property')
  }

  private static err(msg:string):never{
    throw new Error(msg)
  }
}