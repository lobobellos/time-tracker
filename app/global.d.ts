

declare type privateUserData = [
  name: string,
  title: string,
  times: time[]
]

declare type time = [number, number];

declare type UserData = [
  pin: number,
  name: string,
  title: string,
  times: time[]
]

declare interface changeNameInfo {
  pin: number
  newName: string
}

declare interface changeTitleInfo {
  pin: number;
  newTitle: string;
}

declare interface loginInfo {
  pin: number;
}