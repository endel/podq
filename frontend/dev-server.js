/* eslint no-console: 0 */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

var config = require(process.env.ELECTRON ? './config/webpack.electron-renderer.config.js' : './config/webpack.browser.config.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: !!process.env.HOT,
  historyApiFallback: true,
  stats: { colors: true }
}).listen(9000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:9000/');
});
