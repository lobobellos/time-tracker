import chalk from "chalk"
import {init} from  './inputListener.js'

console.log(chalk.blueBright("input listener starting"))
init().then(()=>{
  console.log(chalk.greenBright('input listener started succesfully!!'))
}).catch(
  console.error
)
