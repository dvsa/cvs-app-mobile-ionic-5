/**
 * This file is created to be able to dynamically create config files per envs
 * Files will be created with npm run config.
 * Please don't forget to rename your env file to .env with the appropriate env vars
 */
import { config } from 'dotenv';
config();
import { log } from 'debug';
import { existsSync, outputFileSync } from 'fs-extra';

import * as fromConfigFiles from './config/';

if (existsSync('./.env')) {
  log('\n=============================================================');
  log('Using .env to supply environment variables in config files');
} else {
  log('\n=============================================================');
  log('File .env not available. Please check env file as example');
  process.exit(99);
}

const createFile = (path: string, data: any): Promise<void> =>
  new Promise((resolve, reject) => {
    try {
      resolve(outputFileSync(path, data));
    } catch (e) {
      log('\n=============================================================');
      log(`* Failed to create file in path ${path} *`);
      log('\n=============================================================');

      reject(e);
    }
  });

(async () => {
  try {
    await Promise.all([
      createFile('config/application.hybrid.ts', fromConfigFiles.hybridConfig),
      createFile('sentry.properties', fromConfigFiles.sentryFile)
    ]);
    log('\n=============================================================');
    log('Files written to path!');
    log('\n=============================================================');
  } catch (e) {
    console.error(e);
    log(JSON.stringify(e, null, 2));
  }
})();
