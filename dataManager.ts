import fs from 'fs/promises';

type time = [number, number];

interface UserDataBase {
  name: string;
  age: number;
  time: time[];
}

interface DataBase  {
  userData: UserDataBase[];
}

class UserData implements UserDataBase {
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

  static fromBase(base: UserDataBase): UserData{
    return new UserData(base.name, base.age, base.time);
  }

  toString(): string{
    return JSON.stringify({name: this.name, age: this.age, time: this.time});
  }
}

class Data implements DataBase {
  userData: UserData[]
  private constructor(userData: UserData[]){
    this.userData = userData
  }

  static fromJSON(json: string): Data{
    let parsed:DataBase = JSON.parse(json);
    return new Data(
      parsed.userData.map(
        (base)=>UserData.fromBase(base)));
  }

  toString(): string{
    return JSON.stringify({userData: this.userData.map(el=>el.toString())});
  }
};


export async function getRawData(){
  return Data.fromJSON(
    await fs.readFile('./data/data.json', 'utf-8')
  )
}

export function writeData(data: Data){
  return fs.writeFile('./data/data.json',data.toString() )
}