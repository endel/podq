'use strict';

import path from 'path';
import webpack from 'webpack';
import baseConfig from './webpack.base.config';

let config = {
  ...baseConfig,

  devtool: '',

  entry: [
    path.join(__dirname, '/../app/js/platforms/electron.main.js')
  ],

  output: {
    path: path.join(__dirname, '..'),
    filename: 'main.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    //new webpack.BannerPlugin(
    //  'require("source-map-support").install();',
    //  { raw: true, entryOnly: false }
    //),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  target: 'electron-main',

  node: {
    __dirname: false,
    __filename: false
  },

};

module.exports = config;
