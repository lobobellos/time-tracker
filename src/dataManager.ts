import fs from 'fs/promises';

export type time = [number, number];

export type privateUserData = [
  name: string,
  title: string,
  times: time[]
]

export type UserData = [
  pin: number,
  name: string,
  title: string,
  times: time[]
]


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
    this.updateSumTime();

  }

  updateSumTime() {
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

export async function deleteUser(pin: number) {
  writeData(
    (await getRawData()).filter(el => el[0] != pin)
  )
}

export async function getRawData(): Promise<UserData[]> {
  return JSON.parse(await fs.readFile('./data/data.json', 'utf-8'));
}

export async function getParsedData() {
  return (await getRawData()).map(el => new User(el[0], el[1], el[2], el[3]))
}

export async function getSortedData() {
  return (await getParsedData()).sort((a, b) => b.sumTime - a.sumTime);
}

export async function writeData(data: UserData[]) {
  await fs.writeFile('./data/data.json', JSON.stringify(data), 'utf-8')
}

export const exampleData: privateUserData[] = [
  ["Josiah", "Team Captain", [[0, 1001], [2000, 3000], [0, 121000]]],
  ["Michael", "Drive Team Captain", [[0, 6000000]]],
  ["Rebecca", "Team Captain", [[1683496997868, 1683497997868]]],
]