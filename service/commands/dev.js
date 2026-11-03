import loadEnv from '../utils/loadEnv.js'

import chalk from 'chalk'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import { info } from '../utils/logger.js'
import getLocalIP from '../utils/getLocalIP.js'

loadEnv()
loadEnv('development')

// 动态加载 Webpack 配置，确保配置读取已初始化的环境变量。
const { default: devWebpackConfig } = await import('../config/dev.js')

const devServerOptions = devWebpackConfig.devServer
const serverType = devServerOptions.server?.type || devServerOptions.server || 'http'
const protocol = serverType === 'http' ? 'http' : 'https'
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

try {
  await server.start()
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
