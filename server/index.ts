import chalk from "chalk"

console.log(chalk.blueBright("index starting"))

await import('../server.js')

await import('./inputListener.js')