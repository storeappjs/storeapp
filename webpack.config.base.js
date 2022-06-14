const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = function (entry, output, mode = 'production', base = 'packages', isCli = false) {
  const p = path.parse(path.join(__dirname, base, output));
  const plugins = [];
  if (isCli) {
    plugins.push(new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }));
  }
  return {
    entry: [path.join(__dirname, base, entry)],
    externalsPresets: { node: true },
    mode,
    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: ['babel-loader', 'ts-loader'],
          exclude: [/node_modules/, p.dir],
        },
      ],
    },
    externals: [nodeExternals()],
    plugins,
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
      libraryTarget: 'commonjs',
      filename: p.base,
      path: p.dir,
    },
    optimization: {
      usedExports: true,
    },
    stats: 'errors-only',
  };
};
