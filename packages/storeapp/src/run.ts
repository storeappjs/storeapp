import { execSync } from 'child_process';
import { join } from 'path';
import { APPLICATION_INSTALLED_PATH } from '../lib/constants';
import { dev } from '../logger';
import { getApplicationConfig } from './build';

export default function run(appName: string) {
  const cfg = getApplicationConfig(appName);
  dev(`Running ${`${appName}@${cfg.version}`.bold}`);
  execSync(`node ${join(APPLICATION_INSTALLED_PATH(appName), cfg.main)}`, { stdio: 'inherit' });
}
