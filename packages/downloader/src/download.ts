import fetch from 'node-fetch';
import fs from 'fs';
import Zip from 'adm-zip';

export default async function downloadEngine(url: string, output: string, outDir: string) {
  const response = await fetch(url);
  const file = fs.createWriteStream(output);

  await new Promise<void>((resolve, reject) => {
    response.body.pipe(file);
    file
      .on('finish', () => {
        file.close();
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });

  const zipFile = new Zip(output);
  zipFile.extractAllTo(outDir, true);

  return 0;
}
