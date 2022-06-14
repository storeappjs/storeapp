const base = require('./webpack.config.base');

module.exports = [base('index.ts', 'dist/server.js', 'production', 'site/backend')];
