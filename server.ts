
import express from 'express';
import * as url from 'url';
import path from 'node:path';
import chalk from 'chalk';

let app = express();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const buildPath = path.resolve(__dirname, 'dist');

app.use(express.static(buildPath));


app.get('/', (req,res)=> {
  res.sendFile(path + "index.html");
});

const PORT = process.env.PORT || 8080;

export function startServer(){
  app.listen(PORT, () => {
    console.log(chalk.greenBright(`Server is running on port ${PORT}.`));
  });
}

