'use strict';

import path from 'path';
import webpack from 'webpack';
import baseConfig from './webpack.base.config';

module.exports = {
  ...baseConfig,

  output: {
    ...baseConfig.output,
    publicPath: ''
  },
  entry: [
    path.join(__dirname, '/../app/js/platforms/electron.js')
  ],

  target: 'electron-renderer',
};
