import fs from 'fs/promises';

type time = [number, number];

type UserData =[
  pin: number,
  name: string,
  title: string,
  times: time[]
]

class User {
  pin: number
  name: string
  title: string
  times: time[]
  sumTime: number
  constructor(...[pin, name, title, times]: UserData){
    this.pin = pin
    this.name = name
    this.title = title
    this.times = times
    this.sumTime = times.map(el=>el[1]-el[0]).reduce((a, b) => a+b, 0)
  }

  toBase(): UserData{
    return [
      this.pin,
      this.name,
      this.title,
      this.times
    ]
  }

  fromBase(data: string){
    return new User(...<UserData>JSON.parse(data))
  }
}



function sum(...arr: number[]) {
  return arr.reduce((a, b) => a + b, 0);
}

export async function addUser(pin: number, name: string, title: string) {
  let data = await getRawData()
  if (data.find(el => el[0] == pin)) {
    throw `Pin ${pin} already exists.`
  }else if(data.find(el => el[1] == name)){
    throw `Name ${name} already exists.`
  }
  writeData([
    ...data,
    <UserData>[pin,name,title,[]]
  ])
}

export async function deleteUser(pin:number){
  writeData(
    (await getRawData()).filter(el=>el[0] != pin)
  )
}

export async function getRawData(): Promise<UserData[]> {
  return JSON.parse(await fs.readFile('./data/data.json', 'utf-8'));
}

export async function getParsedData(){
  return (await getRawData()).map(el=>new User(el[0],el[1],el[2],el[3]))
}

export async function getSortedData() {
  return (await getParsedData()).sort((a, b) => b.sumTime - a.sumTime);
}

export async function writeData(data: UserData[]) {
  await fs.writeFile('./data/data.json', JSON.stringify(data), 'utf-8')
}
