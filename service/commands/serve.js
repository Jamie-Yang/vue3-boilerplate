'use strict'

const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const { info } = require('../utils/logger')
const getLocalIP = require('../utils/getLocalIP')

const devWebpackConfig = require('../config/dev')

const devServerOptions = devWebpackConfig.devServer
const protocol = devServerOptions.https ? 'https' : 'http'
const host = devServerOptions.host || '0.0.0.0'
const port = devServerOptions.port || 8080

info('Starting development server...')

const compiler = webpack(devWebpackConfig)
const server = new WebpackDevServer(compiler, devServerOptions)

compiler.hooks.done.tap('serve', (stats) => {
  if (stats.hasErrors()) {
    return
  }
  console.log()
  console.log()
  console.log(`App running at:`)
  console.log(`  - Local:   ${chalk.cyan(`${protocol}://${host}:${port}`)}`)
  console.log(`  - Network: ${chalk.cyan(`${protocol}://${getLocalIP()}:${port}`)}`)
  console.log()
})

server.listen(port, host, (err) => {
  if (err) {
    process.exit(0)
  }
})
