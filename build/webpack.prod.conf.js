'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')

const baseWebpackConfig = require('./webpack.base.conf')
const config = require('./config')

module.exports = merge(baseWebpackConfig, {
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
