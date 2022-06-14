/* eslint-disable no-new-func */

import { existsSync, readFileSync } from 'fs';
import { join, parse } from 'path';
import type { ApplicationConfig } from '@storeapp/types';
import { APPLICATION_INSTALLED_PATH, ROOT_PATH } from '../lib/constants';
import { dev, error } from '../logger';

export function getApplicationConfig(appName: string): ApplicationConfig {
  if (!existsSync(join(APPLICATION_INSTALLED_PATH(appName), 'storeapp.config.json'))) {
    error(`Application ${appName} doesn't support storeapp.`);
  }
  return JSON.parse(readFileSync(join(APPLICATION_INSTALLED_PATH(appName), 'storeapp.config.json')).toString());
}

export function build(appName: string): void {
  const config = getApplicationConfig(appName);
  if (config.worker && config.worker.BuildScript) {
    dev(`Running build script for ${appName.bold}`);
    const a = join(APPLICATION_INSTALLED_PATH(appName), config.worker.BuildScript);
    const b = (s) => s.replaceAll("'", '"').replaceAll('\\', '/');
    // eslint-disable-next-line no-eval
    eval(
      `/* */var STOREAPP = {};STOREAPP.dirname = '${b(parse(a).dir)}';STOREAPP.filename = '${b(a)}';STOREAPP.cwd = '${b(
        process.cwd()
      )}';STOREAPP.applicationRoot = '${b(join(APPLICATION_INSTALLED_PATH(appName)))}';STOREAPP.storeappRoot = '${b(
        ROOT_PATH
      )}';/* */global.StoreApp = STOREAPP;/* */${readFileSync(a).toString()}`
    );
  }
}
