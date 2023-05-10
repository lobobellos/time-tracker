
import express from 'express';
import * as url from 'url';
import path from 'node:path';
import chalk from 'chalk';
import { addUser, getRawData } from './src/dataManager.js';
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
  res.send(await getRawData());
});

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
  }else{
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
    res.status(400)
    res.send(err);
  }
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(chalk.greenBright(`Server is running on port ${PORT}.`));
  //@ts-ignore
  console.log("\n IP addresses: \n" + Object.values((await import('os')).networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family === 'IPv4' && !i.internal && i.address || []), [])), []).join("\n"));
});


