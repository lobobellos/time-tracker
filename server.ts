
import express from 'express';
import * as url from 'url';
import path from 'node:path';
import chalk from 'chalk';
import { getRawData } from './dataManager.js';

let app = express();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const buildPath = path.resolve(__dirname, 'dist');

app.use(express.static(buildPath));

app.get("/data", (req, res) => {
  res.type("json");
  res.send(getRawData());
});

app.get('*', (req,res)=> {
  res.sendFile(buildPath + "/index.html");
});


const PORT = process.env.PORT || 8080;

export function startServer(){
  app.listen(PORT, () => {
    console.log(chalk.greenBright(`Server is running on port ${PORT}.`));
  });
}

