import fs from 'fs/promises'
import chalk from 'chalk'

const path = './data/data.json'
const watcher =fs.watch(path)
console.log(chalk.blueBright('Watcher Started'))

for await(let _ of watcher){
  console.clear()
  try{
    console.table(JSON.parse(await fs.readFile(path,'utf-8')))
  }catch(err){
    console.error(err?.message)
  }
}