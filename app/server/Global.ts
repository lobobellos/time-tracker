import {config} from 'dotenv'
config()
import Client from '@replit/database'

if(process.env?.REPLIT_DB_URL == undefined) throw new Error('REPLIT_DB_URL is not defined')
if(process.env?.ADMIN_PASSWORD == undefined) throw new Error('ADMIN_PASSWORD is not defined')

export default class Global{
  private static _db = new Client(process.env?.REPLIT_DB_URL)
  private static _adminPassword = process.env.ADMIN_PASSWORD

  static get db(){
    return Global._db
  }

  static set db(db){
    throw new Error('cannot set this property')
  }

  static get adminPassword(){
    return Global._adminPassword 
  }

  static set adminPassword(adminPassword){
    throw new Error('cannot set this property')
  }
}