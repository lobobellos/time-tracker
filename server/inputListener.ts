import Global from './Global.js'
import gpio from 'rpi-gpio'
import Lcd from './lcd.js'

export async function init() {
  let lastPin: null | number = null
  let tempPin = ""
  let clockedIn = new Map<number, number>() //pin, timestamp
  let pressedRecently = false;
  
  await gpio.promise.setup(7, gpio.DIR_IN, gpio.EDGE_RISING)
  await gpio.promise.setup(11, gpio.DIR_IN, gpio.EDGE_RISING)

  gpio.on('change', async rpipin => {
    if (pressedRecently) return;
    pressedRecently = true
    setTimeout(() => pressedRecently = false, 500)
    console.log(`pin ${rpipin} pressed`)
    if (lastPin == null) return
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
            Lcd.line1 = "login succesfull"
          }else{
            Lcd.line1 = await res.text()
          }
        })

      }
    }
  })

  const KEYSTATETABLE = {
    "<KP0>": 0,
    "<KP1>": 1,
    "<KP2>": 2,
    "<KP3>": 3,
    "<KP4>": 4,
    "<KP5>": 5,
    "<KP6>": 6,
    "<KP7>": 7,
    "<KP8>": 8,
    "<KP9>": 9,
  }

  //@ts-ignore
  const GK = (await import("global-keypress")).default
  const gk = new GK();

  // launch keypress daemon process
  gk.start();

  gk.on('press', ({ data }: any) => {
    console.log(data)

    if (data == "<KPEnter>" && tempPin != '') {
      lastPin = parseInt(tempPin)
      tempPin = ""
      setTimeout(() => lastPin = null, 10_000)
    } else {
      tempPin += (parseInt(KEYSTATETABLE[data] ?? "") || "").toString()
    }
    console.log(tempPin)
    console.log(lastPin)
  })

  // process error
  gk.on('error', error => {
    console.error(error);
  });

  // process closed
  gk.on('close', () => {
    console.log('closed');
  });
}

function isvalid(t: time): boolean {
  let [start, end] = t
  const day = 24 * 60 * 60 * 1000
  return (new Date(start)).getDay() == (new Date(end)).getDay() &&
    end - start < day
}


