const { info } = require('../utils/logger')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const config = require('../project.config')
const devWebpackConfig = require('../config/dev')

info('Starting development server...')

const compiler = webpack(devWebpackConfig)
const server = new WebpackDevServer(compiler, {
  clientLogLevel: 'info',
  historyApiFallback: {
    rewrites: [
      {
        from: /.*/,
        to: path.posix.join(config.dev.publicPath, 'index.html'),
      },
    ],
  },
  hot: true,
  contentBase: false, // since we use CopyWebpackPlugin.
  compress: true,
  publicPath: config.dev.publicPath,
  overlay: { warnings: false, errors: true },
  host: '0.0.0.0',
  port: config.dev.port,
  https: false,
  open: true,
})

;['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    server.close(() => {
      process.exit(0)
    })
  })
})

compiler.hooks.done.tap('serve', (stats) => {
  if (stats.hasErrors()) {
    return
  }
  console.log()
  console.log(`  App running at:`)
  // console.log(`  - Local:   ${chalk.cyan(urls.localUrlForTerminal)} ${copied}`)
  // console.log(`  - Network: ${chalk.cyan(networkUrl)}`)
})

function genHistoryApiFallbackRewrites(baseUrl, pages = {}) {
  const path = require('path')
  const multiPageRewrites = Object.keys(pages)
    // sort by length in reversed order to avoid overrides
    // eg. 'page11' should appear in front of 'page1'
    .sort((a, b) => b.length - a.length)
    .map((name) => ({
      from: new RegExp(`^/${name}`),
      to: path.posix.join(baseUrl, pages[name].filename || `${name}.html`),
    }))
  return [...multiPageRewrites, { from: /./, to: path.posix.join(baseUrl, 'index.html') }]
}
