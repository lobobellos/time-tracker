import {config} from 'dotenv'
config()
import Client from '@replit/database'


console.log("database URL: ",process.env?.REPLIT_DB_URL ? 'defined': 'undefined')

if(process.env?.REPLIT_DB_URL == undefined) throw new Error('REPLIT_DB_URL is not defined')

export default class Global{

  static db = new Client(process.env?.REPLIT_DB_URL)

}