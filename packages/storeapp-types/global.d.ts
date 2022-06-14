export interface StoreApp {
  /**
   * dirname of entry file
   * use this variable instead of `__dirname`
   */
  dirname: string;
  /**
   * filename of entry file
   * use this variable instead of `__filename`
   */
  filename: string;
  /**
   * = `process.cwd()`
   */
  cwd: string;
  applicationRoot: string;
  storeappRoot: string;
}

export interface ApplicationWorkerConfig {
  BuildScript?: string;
}

export interface ApplicationConfig {
  main: string;
  version?: string;
  worker?: ApplicationWorkerConfig;
}

declare global {
  interface Window {
    StoreApp: StoreApp;
  }
}
