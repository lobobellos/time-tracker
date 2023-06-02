import dotenv from 'dotenv'
dotenv.config()

export default class Lcd {
  static initilized = false
  private ip = 'undefined'
  private cur = 0
  private line2 = ""
  constructor() {
    if (!Lcd.initilized) {
      Lcd.initilized = true
      this.init()
    } else {
      throw new Error('Lcd already initialized')
    }
  }
  async init() {
    if (process.env.IS_PROD == 'true') {
      //@ts-ignore
      const Lcd = (await import('lcd')).default
      const lcd = new Lcd({ rs: 26, e: 19, data: [13, 6, 5, 11], cols: 16, rows: 2 });
      lcd.on('ready', async () => {
        setInterval(async () => {
          await lcd.clear();
          lcd.setCursor(0, 0);
          lcd.print(this.getParsedString(), () => {
            lcd.setCursor(0, 1);
            lcd.print(this.line2 ?? "", () => { })
          });
          this.cur = (this.cur + 1) % (this.getFullString().length - 16)
        }, 1000)
      })
    }
    
  }
  getFullString() {
    return `go to ${this.ip}`
  }

  getParsedString() {
    return this.getFullString().substring(this.cur, this.cur + 16)
  }

  setIP(ip: string) {
    this.ip = ip
  }

  setLine2(line2: string) {
    this.line2 = line2
  }
}
