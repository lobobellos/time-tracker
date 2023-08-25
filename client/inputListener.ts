import Global from './Global.js'
import gpio from 'rpi-gpio'
import Lcd from './lcd.js'

type time = [number,number]

export async function init() {
  let lastPin: null | number = null
  let tempPin = ""
  let clockedIn = new Map<number, number>() //pin, timestamp
  let pressedRecently = false;
	let pinClearTimeout: NodeJS.Timeout;
  
  await gpio.promise.setup(7, gpio.DIR_IN, gpio.EDGE_RISING)
  await gpio.promise.setup(11, gpio.DIR_IN, gpio.EDGE_RISING)

	
  Lcd.line2 = "it's working???";

  gpio.on('change', async rpipin => {
    if (pressedRecently) return;
    pressedRecently = true
    setTimeout(() => pressedRecently = false, 500)
    console.log(`pin ${rpipin} pressed`)
    if (lastPin == null) {
      console.log("canot log in without first putting in pin");
			Lcd.sayForSeconds("enter pin first",5)
      return;
    };
    if (rpipin == 7) {
      //clock in
      if (!clockedIn.has(lastPin)) {
				fetch(Global.prodUrl+"/api/login", {
					method: "POST",
					headers: [['Content-Type', 'application/json']],
					body: JSON.stringify({
						pin:lastPin
					})
				})
				.then(res=>res.json())
				.then(async res => {
					if (res.ok) {
						console.log("login success")
						clockedIn.set(lastPin, Date.now())
						Lcd.sayForSeconds("Hello there",5)
					}else{
						console.log("login failure",res)
						Lcd.sayForSeconds("pin not found",5)
					}
				}).catch(err=>{
					console.log(err)
				})
      }else{
        console.log('you were already clocked in')
				Lcd.sayForSeconds("spam isn't cool",5)
			}
    } else if (rpipin == 11) {
      //clock out
      if (lastPin && clockedIn.has(lastPin) ) {
        const time: time = [
          <number>clockedIn.get(lastPin),
          Date.now()
        ]
				console.log("your time:\n",time)
        if (isvalid(time)){
					fetch(Global.prodUrl+"/api/client/addTime", {
	          method: "POST",
	          headers: [['Content-Type', 'application/json']],
	          body: JSON.stringify({
	            time,
	            pin:lastPin
	          })
	        })
					.then(res=>res.json())
					.then(async res => {
						clockedIn.delete(lastPin)
	          if (res.ok) {
	            console.log("clocking out")
	            Lcd.sayForSeconds("logout success",5)
	          }else{
	            console.log("failure: "+ await res.text())
							Lcd.sayForSeconds("logout failure",5)
	          }
	        }).catch(err=>{
						console.log(err)
					})
				}else{
					console.log("invalid time")
				}
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
    console.log("\nraw data:",data)

    if (data == "<KPEnter>" && tempPin != '') {
      lastPin = parseInt(tempPin)
      tempPin = ""
			clearTimeout(this.pinClearTimeout)
      this.pinClearTimeout = setTimeout(() => lastPin = null, 10e3)
    }else if(data == "<Backspace>" && tempPin.length > 0){
			tempPin = tempPin.substring(0,tempPin.length-1)
		} else {
      tempPin += (KEYSTATETABLE[data] ?? "").toString()
    }
    console.log("temp pin:", tempPin)
    console.log("last pin:", lastPin)
  })

  // process error
  gk.on('error', error => {
    console.error(error);
  });

  // process closed
  gk.on('\nkeylistener closing\n', () => {
    console.log('closed');
  });
}

function isvalid(t: time): boolean {
  let [start, end] = t
  const day = 24 * 60 * 60 * 1000
  return (new Date(start)).getDay() == (new Date(end)).getDay() &&
    end - start < day
}