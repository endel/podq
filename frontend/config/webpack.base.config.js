'use strict';

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const autoprefixer = require('autoprefixer');
const stylusLoader = ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!stylus-loader");

export default {
  devtool: 'source-map',

  entry: [
    // 'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '/../app/js/main.js')
  ],

  output: {
    path: path.join(__dirname, '/../../public'),
    filename: '[name].js',
    publicPath: '/'
  },

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
    // new webpack.HotModuleReplacementPlugin(),
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
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-0"]
      }
    },
    {
      test: /\.json?$/,
      loader: 'json'
    },
    { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'file?name=[path][name].[ext]&context=./app' },
    { test: /\.styl$/, loader: stylusLoader }
    ]
  }

};
