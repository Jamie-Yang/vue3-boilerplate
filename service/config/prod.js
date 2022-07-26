'use strict'

const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

const baseWebpackConfig = require('./base')
const cssWebpackConfig = require('./css')
const config = require('../project.config')
const terserOptions = require('./terserOptions')
const workboxOptions = require('./workboxOptions')

module.exports = merge(baseWebpackConfig, cssWebpackConfig, {
  mode: 'production',

  output: {
    publicPath: config.build.publicPath,
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(terserOptions())],
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
      },
    },
  },

  plugins: [new WorkboxPlugin[config.pwa.workboxPluginMode](workboxOptions(config.pwa))],
})
