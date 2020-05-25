'use strict'

// const url = require('url')
// const webpack = require('webpack')
// const WebpackDevServer = require('webpack-dev-server')
// const portfinder = require('portfinder')
const merge = require('webpack-merge')

const baseWebpackConfig = require('./webpack.base.conf')
const config = require('./config')

const webpackConfig = merge(baseWebpackConfig, {
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    clientLogLevel: 'silent',
    contentBase: './dist',
    hot: true,
    compress: false,
    publicPath: config.dev.publicPath,
    overlay: { warnings: false, errors: true },
    host: '0.0.0.0',
    port: config.dev.port,
    https: false,
    open: true,
  },
})

module.exports = webpackConfig
