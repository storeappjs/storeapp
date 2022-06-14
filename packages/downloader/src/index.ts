import { readdirSync } from 'fs';
import { moveSync } from 'fs-extra';
import { join } from 'path';
import downloadEngine from './download';

interface DownloadOptions {
  zipOutput: string;
  outDir: string;
  isGithub?: boolean;
}

/**
 * @param url
 * @param opts
 */
async function download(url: string, opts: DownloadOptions) {
  await downloadEngine(url, opts.zipOutput, join(opts.outDir, '../../cache'));
  if (opts.isGithub) {
    const directory = readdirSync(join(opts.outDir, '../../cache'));
    if (directory.length === 1) {
      moveSync(`${join(opts.outDir, '../../cache')}/${directory[0]}`, opts.outDir);
    }
  }
}

export { download };
