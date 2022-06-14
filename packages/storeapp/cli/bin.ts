#!/usr/bin/env node

/* eslint-disable global-require */
import helper from '@otox/cli-helper';
import { existsSync } from 'fs';
import rimraf from 'rimraf';
import { APPLICATION_INSTALLED_PATH } from '../lib/constants';
import { error, info, success } from '../logger';
import { findApplication, searchApplication } from '../server/search';
import { build } from '../src/build';
import download from '../src/download';
import run from '../src/run';

async function main() {
  const command = helper.parseWithOptions(process.argv, { help: 'h', version: 'v' });

  if ((command.options as any).help) {
    console.log(`
  Usage:
    $ storeapp <command> [options]
  Commands:
    install <app-name>       Install an app.
    uninstall <app-name>     Uninstall an app.
    run <app-name>           Run an app.
    search <query>           Search for an app.
  Options:
    -v, --version   Show version.
    -h, --help      Show help
  `);
  } else if ((command.options as any).version) {
    console.log(`storeapp v${require('../package.json').version}`);
  } else if (command.command === 'install') {
    const app = await searchApplication(command.params.join(' '));

    if (app !== null) {
      if (existsSync(APPLICATION_INSTALLED_PATH(app.name))) {
        error(`Application ${app.name} is already installed.`);
        info(`> storeapp uninstall ${app.name.bold}`.gray);
      } else {
        // makeApplicationDirectory(app.name);
        info(`Downloading ${app.name.bold}`);
        await download(app.data, app.name);
        success(`${app.name.bold} downloaded successfully`);
        info(`Building ${app.name.bold}`);

        build(app.name);

        success(`${app.name.bold} built successfully`);
        console.log();
        info(`> storeapp run ${app.name.bold}`.gray);
        console.log();
      }
    }
  } else if (command.command === 'uninstall') {
    // info(`Uninstalling ${command.params.join(' ').bold}`);
    if (existsSync(APPLICATION_INSTALLED_PATH(command.params.join(' ')))) {
      rimraf(APPLICATION_INSTALLED_PATH(command.params.join(' ')), () => {
        success(`${command.params.join(' ').bold} uninstalled successfully`);
      });
    }
  } else if (command.command === 'run') {
    if (existsSync(APPLICATION_INSTALLED_PATH(command.params.join(' ')))) {
      run(command.params.join(' '));
    }
  } else if (command.command === 'search') {
    info(`Searching for ${command.params.join(' ').bold}...`);
    const r: any[] = await findApplication(command.params.join(' '));
    const bestMatch: any = r.filter((e) => e.name === command.params.join(' '));
    const otherMatches = r.filter((e) => e.name !== command.params.join(' '));
    console.log(`Found ${r.length.toString().red} applications\n`);
    if (bestMatch.length > 0) {
      console.log(`${bestMatch[0].name.bold} ${`(by ${bestMatch[0].publisher || 'anonymous'})`.grey} ${'(best match)'.green}`);
    }
    otherMatches.forEach((e) => {
      console.log(`${e.name.bold} ${`(by ${e.publisher || 'anonymous'})`.grey}`);
    });
    console.log();
  }
}

main();
