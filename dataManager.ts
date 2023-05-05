import fs from 'fs/promises';

type time = [number, number];

class UserData {
  name: string;
  age: number;
  time: time[];
  totalTime: number
  constructor(name: string, age: number, time: time[]){
    this.name = name;
    this.age = age;
    this.time = time;
    this.totalTime =  time.reduce((a, b) => (a[1]-a[0]) + (b[1]-b[0]), 0);
  }

  toString(): string{
    return JSON.stringify({name: this.name, age: this.age, time: this.time});
  }
}

export async function getRawData(): Promise<UserData[]>{
  return JSON.parse(await fs.readFile('./data/data.json', 'utf-8'));
}

export async function getParsedData(){
  return (await getRawData()).map(d => new UserData(d.name, d.age, d.time));
}

export function writeData(data: UserData[]){
  return fs.writeFile('./data/data.json',data.toString() )
}