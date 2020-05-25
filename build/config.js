'use strict'
const path = require('path')

const devConfig = {
  publicPath: '/',
}

const buildConfig = {
  publicPath: '/',
}

module.exports = {
  outputDir: path.resolve(__dirname, '../dist'),

  dev: devConfig,
  build: buildConfig,
}
