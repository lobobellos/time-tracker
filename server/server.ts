import dotenv from 'dotenv'
dotenv.config()
if (process.env.ADMIN_PASSWORD == undefined) throw new Error('ADMIN_PASSWORD is not defined')

import os from 'node:os'
import express from 'express';
import path from 'node:path';
import chalk from 'chalk';
import Lcd from './lcd.js';
import { addUser, changeName, changeTitle, changeUserPin, getRawData, getUser,  writeData } from './dataManager.js';
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express();
const lcd = new Lcd();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json());

app.get("/fullData", async (req, res) => {
  if (req.headers['admin-password'] == process.env.ADMIN_PASSWORD) {
    res.send(await getRawData());
  } else {
    res.sendStatus(401);
  }
});

app.post("/publishData", async (req, res) => {
  if (req.headers['admin-password'] == process.env.ADMIN_PASSWORD) {
    try {
      await writeData(req.body.data);
      res.sendStatus(202);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(401);
  }
})

app.post("/getUser", async (req, res) => {
  res.type("json");
  let data = await getUser(req.body.pin);
  res.send({
    data,
    found: data !== undefined
  })
})

app.post("/changeTitle", async (req: { body: changeTitleInfo }, res) => {
  console.log(req.body);

  try {
    await changeTitle(req.body.pin, req.body.newTitle);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(400)
    res.send(err);
  }
})

app.post('/isAdminPassword', async (req, res) => {
  res.send(req.body.password == process.env.ADMIN_PASSWORD)
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(chalk.greenBright(`Server is running on port ${PORT}.`));
  let interfaces = os.networkInterfaces();
  let ip = interfaces?.wlan0?.find(el => el.family === 'IPv4')?.address;
  console.log(ip);
  let url = ip+":" + PORT
  lcd.setIP(url)  
});


