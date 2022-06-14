const base = require('./webpack.config.base');

module.exports = [
  base('downloader/src/index.ts', 'downloader/dist/index.js'),
  base('storeapp/cli/bin.ts', 'storeapp/dist/bin.js', 'production', 'packages', true),
];
