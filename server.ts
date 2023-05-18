import dotenv from 'dotenv'
dotenv.config()
if (process.env.ADMIN_PASSWORD == undefined) throw new Error('ADMIN_PASSWORD is not defined')

import os from 'node:os'
import express from 'express';
import * as url from 'url';
import path from 'node:path';
import chalk from 'chalk';
import { addUser, changeName, changeTitle, changeUserPin, getRawData, getUser, privateUserData, writeData } from './src/dataManager.js';
import { createServer as createViteServer } from 'vite'

let app = express();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom', // don't include Vite's default HTML handling middlewares
})

app.use(vite.middlewares)
app.use(express.json());

app.get("/data", async (req, res) => {
  res.type("json");
  res.send(<privateUserData[]>(await getRawData()).map(el => el.splice(1)));
});

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

app.post("/login", async (req, res) => {
  console.log(req.body);
  console.log(req.body.pin);
  res.type("json");
  const data = (await getRawData())
    .find(el => el[0] == req.body.pin)

  if (!data) {
    res.send(JSON.stringify({
      found: false
    }))
  } else {
    res.cookie("pin", req.body.pin);
    res.send(JSON.stringify({
      data,
      found: true
    }))
  }
});

app.post('/create', async (req, res) => {
  try {
    await addUser(req.body.pin, req.body.name, req.body.title);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(400)
    res.send(err);
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

export interface changeNameInfo {
  pin: number
  newName: string
}

export interface changeTitleInfo {
  pin: number;
  newTitle: string;
}

app.post("/changePin", async (req, res) => {
  console.log(req.body);
  try {
    await changeUserPin(req.body.pin, req.body.newPin);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(400)
    res.send(err);
  }
})

app.post("/changeName", async (req: { body: changeNameInfo }, res) => {
  console.log(req.body);

  try {
    await changeName(req.body.pin, req.body.newName);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(400)
    res.send(err);
  }
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(chalk.greenBright(`Server is running on port ${PORT}.`));
  //@ts-ignore
 console.log(os.networkInterfaces()['Wi-Fi'].filter(el=>el.family==='IPv4' && el.internal===false)[0])
});


