import { existsSync } from 'fs';
import { APPLICATION_INSTALLED_PATH } from '../lib/constants';
import { searchApplication } from '../server/search';
import { build } from './build';
import download from './download';

export default async function install(appName: string) {
  const app = await searchApplication(appName);

  if (app !== null) {
    if (existsSync(APPLICATION_INSTALLED_PATH(appName))) {
      throw new Error(`Application ${app.name} is already installed.`);
    } else {
      await download(app.data, app.name);
      build(app.name);
    }
  }
}
