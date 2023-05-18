import Lcd from 'lcd';

const lcd = new Lcd({ rs: 26, e: 19, data: [13, 6, 5, 11], cols: 16, rows: 2 });

let ip = ""

export function setIP(ipString: string) {
  ip = ipString
}

lcd.on('ready', async() => {
  //lcd.autoscroll();
  
  setInterval(async () => {
    await lcd.clear();
    await writeToLcd(0,0,"view data at");
    await writeToLcd(1,0,ip);
  })
})



export async function writeToLcd(col:number, row:number, data:string) : Promise<void> {
  return new Promise((resolve, reject) => {
    console.log("LCD written "+data)
    lcd.setCursor(col, row);
    lcd.print(data, (err) => {
      if (err) {
        reject(err);
      }
    })
    resolve();
  })
}