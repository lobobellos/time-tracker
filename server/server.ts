import dotenv from 'dotenv'
dotenv.config()
if (process.env.ADMIN_PASSWORD == undefined) throw new Error('ADMIN_PASSWORD is not defined')

import os from 'node:os'
import express from 'express';
import chalk from 'chalk';
import Lcd from './lcd.js';

const app = express();
const lcd = new Lcd();
app.use(express.json());


const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(chalk.greenBright(`Server is running on port ${PORT}.`));
  let interfaces = os.networkInterfaces();
  let ip = interfaces?.wlan0?.find(el => el.family === 'IPv4')?.address;
  console.log(ip);
  let url = ip+":" + PORT
  lcd.setIP(url)  
});


