'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')

const baseWebpackConfig = require('./base')
const cssWebpackConfig = require('./css')
const config = require('../project.config')

module.exports = merge(baseWebpackConfig, cssWebpackConfig, {
  mode: 'production',

  output: {
    publicPath: config.build.publicPath,
  },

  plugins: [
    // new webpack.HashedModuleIdsPlugin({
    //   hashDigest: 'hex',
    // }),
  ],
})
