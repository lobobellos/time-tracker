import LCD from 'lcd'
export default class Lcd {
  static readonly ready = false;

  static line1 = "";
  static line2 = "";
  
  private static lcd =new LCD({ rs: 26, e: 19, data: [13, 6, 5, 11], cols: 16, rows: 2 })
  static async init() {
    this.lcd.on('ready', async () => {
      setInterval(async () => {
        await this.lcd.clear();
        this.lcd.setCursor(0, 0);
        this.lcd.print(this.line1 ?? "", () => {
          this.lcd.setCursor(0, 1);
          this.lcd.print(this.line2 ?? "", () => {})
        });
      }, 1000)
    })

    process.on('SIGINT', _ => {
      this.lcd.close();
      console.log("\nLCD closing")
			process.exit()
    });

  }
  
}
