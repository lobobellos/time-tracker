import fs from 'fs/promises';

type time = [number, number];

type User = [
  pin: number,
  data: UserData
]

type UserData = [
  name: string,
  title: string,
  times: time[],
]

export async function addUser(pin: number, name: string, title: string) {
  writeData([
    ...(await getRawData()),
    <User>[pin,[name,title,[]]]
  ])
}

export async function deleteUser(pin:number){
  writeData(
    (await getRawData()).filter(el=>el[0] != pin)
  )
}

export async function getRawData(): Promise<User[]> {
  return JSON.parse(await fs.readFile('./data/data.json', 'utf-8'));
}

export async function getParsedData() {
  return new Map(await getRawData());
}

export async function writeData(data: User[]) {
  await fs.writeFile('./data/data.json', JSON.stringify(data.entries))
}

export async function writeDataFromMap(data: Map<number, UserData>) {
  await writeData(Array.from(data.entries()))
}   