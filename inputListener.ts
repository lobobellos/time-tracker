import gpio from 'rpi-gpio'
import { getRawData, writeData } from './src/dataManager.js'
import chalk from 'chalk'
import type {time }from './src/dataManager.js'

await gpio.promise.setup(7, gpio.DIR_IN, gpio.EDGE_RISING)
await gpio.promise.setup(11, gpio.DIR_IN, gpio.EDGE_RISING)
await gpio.promise.setup(13, gpio.DIR_IN, gpio.EDGE_RISING)
await gpio.promise.setup(15, gpio.DIR_IN, gpio.EDGE_RISING)

gpio.setMode(gpio.MODE_RPI)

type pin = number
type timestamp = number

let lastPin:null|number = null
let clockedIn= new Map<pin,timestamp>()

console.log(chalk.blueBright("starting inputListener"))

gpio.on('change', async rpipin => {
  if(lastPin == null) return
  if (rpipin == 7) {
    //clock in
    if(!clockedIn.has(lastPin)){
      console.log('you are clocked in')
      clockedIn.set(lastPin, Date.now())
    }
  }else if (rpipin == 11) {
    //clock out
    if(clockedIn.has(lastPin)){
      let data = (await getRawData())
      let el = data.find(el=>el[0] == lastPin)
      if(el != undefined){
        el[3]
        .push([
          <number>clockedIn.get(lastPin),
          Date.now()
        ])
      }
      await writeData(data)
      clockedIn.delete(lastPin)
      console.log('you are clocked out')
      console.log(data[3])
    }
  }
})

process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (data:string) => {
  lastPin = parseInt(data);
  lastPin = lastPin >= 0 && lastPin < 10000 ? lastPin : null
  console.log(lastPin)
  setTimeout(() => {
    lastPin = null
  },15_000)
})

process.on('SIGINT', function () {
  console.log('destroying pins.');
  gpio.destroy(() => { console.log('gpio destroyed') })
  process.exit(2);
});