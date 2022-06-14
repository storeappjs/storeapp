import { download } from '@storeapp/downloader';
import { join } from 'path';
import { APPLICATION_INSTALLED_PATH, ROOT_PATH } from '../lib/constants';
import { makeRootDirectory } from '../lib/makeDirectorys';
import { githubZipUrl as url } from '../lib/zipurl';

export default async function downloadApplication(inp: string, appName: string): Promise<number> {
  const github = url(inp);

  makeRootDirectory();

  await download(github, {
    zipOutput: join(ROOT_PATH, 'download', `${appName}.zip`),
    outDir: APPLICATION_INSTALLED_PATH(appName),
    isGithub: true,
  });

  return 0;
}
