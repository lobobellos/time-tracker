import dotenv from 'dotenv'
dotenv.config()
import { getRawData, writeData } from './src/dataManager.js'
import chalk from 'chalk'
import type { time } from './src/dataManager.js'

if (process.env.IS_PROD == 'true') {
  const gpio = (await import('rpi-gpio')).default

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
      if (clockedIn.has(lastPin)) {
        const data = (await getRawData())
        const el = data.find(el => el[0] == lastPin)
        const t: time = [
          <number>clockedIn.get(lastPin),
          Date.now()
        ]
        if (el != undefined && isvalid(t)) {
          el[3].push(t)
        }
        await writeData(data)
        clockedIn.delete(lastPin)
        console.log(data[3])
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

  gk.on('press', (data: any) => {
    console.log(data.data)

    if (data.data == "<KPEnter>" && tempPin != '') {
      lastPin = parseInt(tempPin)
      tempPin = ""
      setTimeout(() => lastPin = null, 10_000)
    } else {
      tempPin += (parseInt(KEYSTATETABLE[data.data] ?? "") || "").toString()
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


type pin = number
type timestamp = number

let lastPin: null | number = null
let tempPin = ""
let clockedIn = new Map<pin, timestamp>()

let pressedRecently = false;

console.log(chalk.blueBright("starting inputListener"))

function isvalid(t: time): boolean {
  let [start, end] = t
  const day = 24 * 60 * 60 * 1000
  return (new Date(start)).getDay() == (new Date(end)).getDay() &&
    end - start < day
}