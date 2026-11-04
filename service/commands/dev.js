import loadEnv from '../utils/loadEnv.js'

import chalk from 'chalk'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import { info } from '../utils/logger.js'
import getLocalIP from '../utils/getLocalIP.js'

loadEnv('development')
// Keep Webpack, Babel, and style processing in the command's mode.
process.env.NODE_ENV = 'development'
process.env.BABEL_ENV = 'development'

// Load the Webpack configuration after initializing environment variables.
const { default: devWebpackConfig } = await import('../config/dev.js')

const devServerOptions = devWebpackConfig.devServer
const serverType = devServerOptions.server?.type || devServerOptions.server || 'http'
const protocol = serverType === 'http' ? 'http' : 'https'
const host = devServerOptions.host || '0.0.0.0'
const port = devServerOptions.port || 8080
const localHost = host === '0.0.0.0' || host === '::' ? 'localhost' : host
const localUrlHost = localHost.includes(':') ? `[${localHost}]` : localHost

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
  console.log(`  - Local:   ${chalk.cyan(`${protocol}://${localUrlHost}:${port}`)}`)
  const networkIP = getLocalIP()
  if (networkIP) {
    console.log(`  - Network: ${chalk.cyan(`${protocol}://${networkIP}:${port}`)}`)
  }
  console.log()
})

try {
  await server.start()
} catch (err) {
  console.error(err)
  process.exitCode = 1
  await new Promise((resolve) => compiler.close(resolve))
}
