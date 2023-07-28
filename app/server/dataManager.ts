import {config} from 'dotenv'
config()

import Client from '@replit/database'

if(process.env?.REPLIT_DB_URL == undefined) throw new Error('REPLIT_DB_URL is not defined')

console.log("database URL: ",process.env?.REPLIT_DB_URL)
let db =new Client(process.env?.REPLIT_DB_URL)

export class PrivateUser {
  name: string;
  title: string;
  times: time[];
  ms: number;
  s: number;
  m: number;
  h: number;
  d: number;
  sumTime: number;
  sumTimeString: string;

  constructor(...[name, title, times]: privateUserData) {
    this.name = name;
    this.title = title;
    this.times = times;
    this.sumTime = sum(...this.times.map(el => el[1] - el[0]));
        const temp = this.sumTime
        this.ms = this.sumTime % 1000;
        this.sumTime = Math.floor(this.sumTime / 1000)
        this.s = this.sumTime % 60;
        this.sumTime = Math.floor(this.sumTime / 60)
        this.m = this.sumTime % 60;
        this.sumTime = Math.floor(this.sumTime / 60)
        this.h = this.sumTime % 24;
        this.sumTime = Math.floor(this.sumTime / 24)
        this.d = this.sumTime;
        this.sumTime = temp
        this.sumTimeString = ` ${this.d} days, ${this.h} hours, ${this.m} mins`
  }

  toBase(): privateUserData {
    return [
      this.name,
      this.title,
      this.times
    ]
  }

  toSecureBase(): privateUserData {
    return [
      this.name,
      this.title,
      this.times
    ]
  }

  static fromBase(data: string) {
    return new User(...<UserData>JSON.parse(data));
  }
}

export class User extends PrivateUser {
  pin: number;
  constructor(...[pin, name, title, times]: UserData) {
    super(name, title, times);
    this.pin = pin;

  }
}

export function sum(...arr: number[]) {
  return arr.reduce((a, b) => a + b, 0);
}

export async function addUser(pin: number, name: string, title: string) {
  let data = await getRawData()
  if (data.find(el => el[0] == pin)) {
    throw `Pin ${pin} already exists.`
  } else if (data.find(el => el[1] == name)) {
    throw `Name ${name} already exists.`
  }
  writeData([
    ...data,
    <UserData>[pin, name, title, []]
  ])
}

export async function getUser(pin: number) {
  return (await getRawData()).find(el => el[0] == pin)
}



export async function changeName(pin: number, newName: string) {
  let data = await getRawData()
  if (data.find(el => el[1] == newName)) {
    throw `Name ${newName} already exists.`
  }
  if (!data.find(el => el[0] == pin)) {
    throw `Name ${pin} does not exist`
  }
  console.log('writing new name')
  writeData(
    data.map(el => el[0] == pin ?
      [el[0], newName, el[2], el[3]] :
      el
    )
  )
}
export async function changeTitle(pin: number, newTitle: string) {
  let data = await getRawData()

  if (!data.find(el => el[0] == pin)) {
    throw `Name ${pin} does not exist`
  }
  console.log('writing new name')
  writeData(
    data.map(el => el[0] == pin ?
      [el[0], el[1], newTitle, el[3]] :
      el
    )
  )
}

export async function changeUserPin(pin: number, newPin: number) {
  let data = await getRawData()
  if (data.find(el => el[0] == newPin)) {
    throw `Pin ${newPin} already exists.`
  }
  writeData(
    (await getRawData()).map(el => el[0] == pin ? [newPin, el[1], el[2], el[3]] : el)
  )
}

export async function deleteUser(pin: number) {
  writeData(
    (await getRawData()).filter(el => el[0] != pin)
  )
}

export async function getRawData(): Promise<UserData[]> {
  const data =<UserData[]> await db.get("users")
  console.log('straight data:', data, typeof data)
  if(typeof data === 'string') return JSON.parse(data)
  return data
}

export async function getParsedData() {
  return (await getRawData()).map(el => new User(el[0], el[1], el[2], el[3]))
}

export async function getSortedData() {
  return (await getParsedData()).sort((a, b) => b.sumTime - a.sumTime);
}

export function writeData(data: UserData[]) {
  db.set("users", data)
}

export const exampleData: privateUserData[] = [
  ["Josiah", "Team Captain", [[0, 1001], [2000, 3000], [0, 121000]]],
  ["Michael", "Drive Team Captain", [[0, 6000000]]],
  ["Rebecca", "Team Captain", [[1683496997868, 1683497997868]]],
]
