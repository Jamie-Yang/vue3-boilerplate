'use strict'
const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../dist'),

  dev: {
    publicPath: '/',
    port: 8080,
  },

  build: {
    publicPath: './',
  },
}
