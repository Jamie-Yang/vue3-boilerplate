'use strict'
// const url = require('url')
// const webpack = require('webpack')
// const WebpackDevServer = require('webpack-dev-server')
// const portfinder = require('portfinder')
const path = require('path')
const merge = require('webpack-merge')

const baseWebpackConfig = require('./webpack.base.conf')
const config = require('./config')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    clientLogLevel: 'silent',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.publicPath, 'index.html'),
        },
      ],
    },
    contentBase: './dist',
    hot: true,
    compress: false,
    publicPath: config.dev.publicPath,
    overlay: { warnings: false, errors: true },
    host: '0.0.0.0',
    port: config.dev.port,
    https: false,
    open: false,
  },
})
