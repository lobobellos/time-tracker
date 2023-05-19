import gpio from 'rpi-gpio'
import { getRawData, writeData } from './src/dataManager.js'
import chalk from 'chalk'
import type { time } from './src/dataManager.js'
import {GlobalKeyboardListener} from "@futpib/node-global-key-listener";

await gpio.promise.setup(7, gpio.DIR_IN, gpio.EDGE_RISING)
await gpio.promise.setup(11, gpio.DIR_IN, gpio.EDGE_RISING)
await gpio.promise.setup(13, gpio.DIR_IN, gpio.EDGE_RISING)
await gpio.promise.setup(15, gpio.DIR_IN, gpio.EDGE_RISING)

gpio.setMode(gpio.MODE_RPI)
const v = new GlobalKeyboardListener();

type pin = number
type timestamp = number

let lastPin: null | number = null
let clockedIn = new Map<pin, timestamp>()

let pressedRecently = false;

console.log(chalk.blueBright("starting inputListener"))

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
      console.log('you are clocked out')
      console.log(data[3])
    }
  }
})


v.addListener(function (e, down) {
  console.log(
      `${e.name} ${e.state == "DOWN" ? "DOWN" : "UP  "} [${e.rawKey?.name}]`
  );
});

function isvalid(t: time): boolean {
  let [start, end] = t
  const day = 24 * 60 * 60 * 1000
  return (new Date(start)).getDay() == (new Date(end)).getDay() &&
    end - start < day
}



process.on('SIGINT', function () {
  console.log('destroying pins.');
  gpio.destroy(() => { console.log('gpio destroyed') })
  process.exit(2);
});