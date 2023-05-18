import Lcd from 'lcd';

const lcd = new Lcd({ rs: 26, e: 19, data: [13, 6, 5, 11], cols: 16, rows: 2 });

let ip = 'undefined'

function getFullString(){
  return  `go to ${ip}`
}

function getParsedString(){
  return  getFullString().substring(cur, cur+16)
}

let cur = 0

export function setIP(ipString: string) {
  ip = ipString
}

lcd.on('ready', async() => {
  //lcd.autoscroll();
  
  setInterval(async () => {
    await lcd.clear();

    lcd.setCursor(0, 0);
    lcd.print( getParsedString(),()=>{});

    cur = (cur + 1) % getFullString().length - 16
  },1000)
})


