import dotenv from 'dotenv'
dotenv.config()

if (process.env.IS_PROD == 'true') {

  const Lcd = (await import('lcd')).default

  const lcd = new Lcd({ rs: 26, e: 19, data: [13, 6, 5, 11], cols: 16, rows: 2 });

  lcd.on('ready', async () => {
    //lcd.autoscroll();

    setInterval(async () => {
      await lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print(getParsedString(), () => { });
      cur = (cur + 1) % (getFullString().length - 16)
    }, 1000)
  })
}

let ip = 'undefined'
let cur = 0

function getFullString() {
  return `go to ${ip}`
}

function getParsedString() {
  return getFullString().substring(cur, cur + 16)
}

export function setIP(ipString: string) {
  ip = ipString
}




