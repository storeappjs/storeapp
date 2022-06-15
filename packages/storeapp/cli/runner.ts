#!/usr/bin/env node

/* eslint-disable global-require */
import { existsSync } from 'fs';
import { APPLICATION_INSTALLED_PATH } from '../lib/constants';
import run from '../src/run';

async function main() {
  const params = process.argv.slice(2);
  if (existsSync(APPLICATION_INSTALLED_PATH(params.join(' ')))) {
    run(params.join(' '));
  }
}

main();
