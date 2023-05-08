import gpio from 'rpi-gpio'
import { getRawData, writeData } from './src/dataManager.js'
import chalk from 'chalk'

await gpio.promise.setup(7, gpio.DIR_IN, gpio.EDGE_RISING)
await gpio.promise.setup(11, gpio.DIR_IN, gpio.EDGE_RISING)

type pin = number
type timestamp = number

let lastPin:null|number = null
let clockedIn= new Map<pin,timestamp>()

console.log(chalk.blueBright("starting inputListener"))

gpio.on('change', async rpipin => {
  console.log(`pin ${rpipin} pressed`)
  if(lastPin == null){
    return
  }
  if (rpipin == 7) {
    //clock in
    console.log('clock in')
    clockedIn.set(lastPin, Date.now())

  }else if (rpipin == 11) {
    //clock out
    console.log('clock out')

    if(clockedIn.has(lastPin)){
      //@ts-ignore
      
    }
    await writeData(
      (await getRawData())
      .map(el=>el[0] == lastPin ?
        [
          el[0],
          el[1],
          el[2],
          [
            ...el[3],
            [<number>clockedIn.get(lastPin), Date.now()],
          ],
        ]: el
      )
    )
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
  console.log('Ctrl-C...');
  gpio.destroy(() => { console.log('gpio destroyed') })
  process.exit(2);
});