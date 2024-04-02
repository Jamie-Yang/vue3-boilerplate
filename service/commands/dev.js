import loadEnv from '../utils/loadEnv.js'
loadEnv()
loadEnv('development')

import chalk from 'chalk'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import { info } from '../utils/logger.js'
import getLocalIP from '../utils/getLocalIP.js'

import devWebpackConfig from '../config/dev.js'

const devServerOptions = devWebpackConfig.devServer
const protocol = devServerOptions.https ? 'https' : 'http'
const host = devServerOptions.host || '0.0.0.0'
const port = devServerOptions.port || 8080

info('Starting development server...')

const compiler = webpack(devWebpackConfig)
const server = new WebpackDevServer(devServerOptions, compiler)

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

server.start(port, host, (err) => {
  if (err) {
    process.exit(0)
  }
})
