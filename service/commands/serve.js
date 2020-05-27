const os = require('os')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const { info } = require('../utils/logger')
const paths = require('../utils/paths')

const config = require('../project.config')
const devWebpackConfig = require('../config/dev')

const devServerOptions = devWebpackConfig.devServer
const protocol = devServerOptions.https ? 'https' : 'http'
const host = devServerOptions.host || '0.0.0.0'
const port = devServerOptions.port || 8080

info('Starting development server...')

const compiler = webpack(devWebpackConfig)
const server = new WebpackDevServer(compiler, devWebpackConfig.devServer)

;['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    server.close(() => {
      process.exit(0)
    })
  })
})

function getLocalIP() {
  const interfaces = os.networkInterfaces()

  for (const devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

compiler.hooks.done.tap('serve', (stats) => {
  if (stats.hasErrors()) {
    return
  }
  console.log()
  console.log(`  App running at:`)
  console.log(`  - Local:   ${chalk.cyan(`localhost:${port}`)}`)
  console.log(`  - Network: ${chalk.cyan(getLocalIP())}`)
  console.log()
})

server.listen(port, host, (err) => {
  if (err) {
    process.exit(0)
  }
})
