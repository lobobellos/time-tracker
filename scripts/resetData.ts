import fs from 'fs/promises';

await fs.mkdir('./data')
await fs.writeFile('./data/data.json','[]','utf-8')
