import Lcd from 'lcd';

const lcd = new Lcd({ rs: 26, e: 19, data: [13, 6, 5, 11], cols: 16, rows: 2 });

let ip = 'undefined'

export function setIP(ipString: string) {
  ip = ipString
}

lcd.on('ready', async() => {
  //lcd.autoscroll();
  
  setInterval(async () => {
    await lcd.clear();

    lcd.setCursor(0, 0);
    lcd.print( ip,()=>{});
  })
})


