interface DownloadOptions {
  zipOutput: string;
  outDir: string;
  isGithub?: boolean;
}

export function download(url: string, opts: DownloadOptions): Promise<void>;
