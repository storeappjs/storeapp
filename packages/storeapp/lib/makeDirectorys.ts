import fs from 'fs';
import { join } from 'path';
import { APPLICATION_INSTALLED_PATH, ROOT_PATH } from './constants';

export const rootDir = ROOT_PATH;

export function makeRootDirectory() {
  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir);
  }
  if (!fs.existsSync(join(rootDir, 'download'))) {
    fs.mkdirSync(join(rootDir, 'download'));
  }
  if (!fs.existsSync(join(rootDir, 'application'))) {
    fs.mkdirSync(join(rootDir, 'application'));
  }
  if (!fs.existsSync(join(rootDir, 'cache'))) {
    fs.mkdirSync(join(rootDir, 'cache'));
  }
}

export function makeApplicationDirectory(appName: string) {
  makeRootDirectory();
  if (!fs.existsSync(APPLICATION_INSTALLED_PATH(appName))) {
    fs.mkdirSync(APPLICATION_INSTALLED_PATH(appName));
  }
}
