import os from 'os';
import { join } from 'path';

export const BACKEND_URL = 'https://storeappjs.herokuapp.com';
export const BACKEND_APPLICATION_URL = `${BACKEND_URL}/application`;

export const ROOT_PATH = join(os.homedir(), '.storeapp');
export const APPLICATION_INSTALLED_PATH = (appName: string): string => `${join(ROOT_PATH, 'application', appName)}`;
