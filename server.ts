
import express from 'express';
import * as url from 'url';
import path from 'node:path';
import chalk from 'chalk';
import { addUser, getRawData } from './dataManager.js';

let app = express();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const buildPath = path.resolve(__dirname, 'dist');

app.use(express.static(buildPath));
app.use(express.json());

app.get("/data", async(req, res) => {
  res.type("json");
  res.send(await getRawData());
});

app.post('/create',async (req, res) => {
  try{
    await addUser(req.body.pin, req.body.name, req.body.title);
    res.sendStatus(201);
  }catch (err){
    res.status(400)
    res.send(err);
  }
})

app.get('*', (req,res)=> {
  res.sendFile(buildPath + "/index.html");
});


const PORT = process.env.PORT || 8080;


  app.listen(PORT, () => {
    console.log(chalk.greenBright(`Server is running on port ${PORT}.`));
  });


