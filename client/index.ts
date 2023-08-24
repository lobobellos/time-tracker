import chalk from "chalk"
import {init} from  './inputListener.js'
import Lcd from  './lcd.js'

console.log(chalk.blueBright("input listener starting"))
init().then(()=>{
  console.log(chalk.greenBright('input listener started succesfully!!'))
}).catch(err=>{
  console.log(err)
})

console.log(chalk.blueBright("LCD starting"))
Lcd.init().then(()=>{
  console.log(chalk.greenBright('LCD started succesfully!!'))
}).catch(err=>{
	console.log(err)
})