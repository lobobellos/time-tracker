import Global from './Global.js'
import gpio from 'rpi-gpio'
import Lcd from './lcd.js'
type time = [number,number]
export async function init() {
  let lastPin: null | number = null
  let tempPin = ""
  let clockedIn = new Map<number, number>() //pin, timestamp
  let pressedRecently = false;
  
  await gpio.promise.setup(7, gpio.DIR_IN, gpio.EDGE_RISING)
  await gpio.promise.setup(11, gpio.DIR_IN, gpio.EDGE_RISING)
  Lcd.line1 = 'potato';
  gpio.on('change', async rpipin => {
    if (pressedRecently) return;
    pressedRecently = true
    setTimeout(() => pressedRecently = false, 500)
    console.log(`pin ${rpipin} pressed`)
    if (lastPin == null) {
      console.log("canot log in without first putting in pin");
      return;
    };
    if (rpipin == 7) {
      //clock in
      if (!clockedIn.has(lastPin)) {
        console.log('you are clocked in')
        clockedIn.set(lastPin, Date.now())
      }
    } else if (rpipin == 11) {
      //clock out
      if (lastPin && clockedIn.has(lastPin) ) {
        const time: time = [
          <number>clockedIn.get(lastPin),
          Date.now()
        ]
        if (isvalid(time)) fetch(Global.prodUrl+"/api/client/addTime", {
          method: "POST",
          headers: [['Content-Type', 'application/json']],
          body: JSON.stringify({
            time,
            pin:lastPin
          })
        }).then(async res => {
          if (res.ok) {
            console.log("login succesfull")
            Lcd.line1 = "login succesfull"
          }else{
            console.log("failure: "+ await res.text())
            Lcd.line1 = await res.text()
          }
        })
        else console.log("invalid time");
      }
    }
  })
