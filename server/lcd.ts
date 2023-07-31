import LCD from 'lcd'
export default class Lcd {
  static initialized = false
  static ready = false
  private static line1 = ''
  private static line2 = ""
  private static lcd =new LCD({ rs: 26, e: 19, data: [13, 6, 5, 11], cols: 16, rows: 2 })
  private static async init() {
    this.lcd.on('ready', async () => {
      setInterval(async () => {
        await this.lcd.clear();
        this.lcd.setCursor(0, 0);
        this.lcd.print(this.line1, () => {
          this.lcd.setCursor(0, 1);
          this.lcd.print(this.line2 ?? "", () => {})
        });
      }, 1000)
    })
  }
  set line1(line: string) {
    this.line1 = line.substring(0,16)
  }
  set line2(line: string) {
    this.line2 = line.substring(0,16)
  }
}