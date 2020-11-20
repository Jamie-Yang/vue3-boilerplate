'use strict'

const webpack = require('webpack')
const { merge } = require('webpack-merge')

const baseWebpackConfig = require('./base')
const cssWebpackConfig = require('./css')
const config = require('../project.config')

module.exports = merge(baseWebpackConfig, cssWebpackConfig, {
  mode: 'development',

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    clientLogLevel: 'silent',
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
    hot: true,
    publicPath: config.dev.publicPath,
    overlay: { warnings: true, errors: true },
    host: '0.0.0.0',
    port: config.dev.port,
    open: false,
    noInfo: true,
  },

  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.ProgressPlugin()],
})
