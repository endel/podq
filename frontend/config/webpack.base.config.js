'use strict';

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const autoprefixer = require('autoprefixer');
const stylusLoader = ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!stylus-loader");

export default {
  devtool: 'source-map',

  output: {
    path: path.join(__dirname, '/../../public/'),
    filename: '[name].js',
    publicPath: '/'
  },

  entry: [
    'webpack-dev-server/client?http://localhost:9000',
    'webpack/hot/only-dev-server',
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin("index.css")
  ],

  postcss: function () {
    return [ autoprefixer ]
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {test: /\.json?$/, loader: 'json'},
      {test: /\.(png|woff|woff2|eot|ttf|svg|node)$/, loader: 'file?name=[path][name].[ext]&context=./app'},
      {test: /\.styl$/, loader: stylusLoader},
      {test: /\.node$/, loader: 'node'},
    ]
  }

};
