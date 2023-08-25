import LCD from 'lcd'
export default class Lcd {
  private static ready = false;
	private static timeout: NodeJS.Timeout
	
  static line1 = "Welcome!";
  static line2 = "Sign in below!";
  private static lcd =new LCD({ rs: 26, e: 19, data: [13, 6, 5, 11], cols: 16, rows: 2 })
	
  static async init() {
    this.lcd.on('ready',async () => {
			this.writeToLcd();
      this.ready = true;
    })
    process.on('SIGINT', _ => {
      this.lcd.close();
      console.log("\nLCD closing")
			process.exit()
    });
  }

	static async writeToLcd(){
		if(this.ready){
			await this.lcd.clear();
			this.lcd.setCursor(0, 0);
			this.lcd.print(this.line1 ?? "", () => {
				this.lcd.setCursor(0, 1);
				this.lcd.print(this.line2 ?? "", () => {})
			});	
		}
	}

	static sayForSeconds(msg:string,s:number,ln2:string){
		this.line1 = msg.substring(0,16);
		this.line2 = ln2;
		this.writeToLcd()
		clearTimeout(this.timeout)
		this.timeout = setTimeout(()=>{
			this.line1 = "Welcome!";
			this.line2 = "Sign in below!";
			this.writeToLcd()
		},s*1000)
	}
}
