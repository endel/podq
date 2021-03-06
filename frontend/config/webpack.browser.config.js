'use strict';

import path from 'path';
import webpack from 'webpack';
import baseConfig from './webpack.base.config';

module.exports = {
  ...baseConfig,

  entry: [
    ...baseConfig.entry,
    path.join(__dirname, '/../app/js/platforms/browser.js')
  ],

};
