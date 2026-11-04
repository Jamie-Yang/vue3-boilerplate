import loadEnv from '../utils/loadEnv.js'
import webpack from 'webpack'

import { error, done } from '../utils/logger.js'
import { logWithSpinner, stopSpinner } from '../utils/spinner.js'

try {
  loadEnv('production')
  // Keep Webpack, Babel, and style processing in the command's mode.
  process.env.NODE_ENV = 'production'
  process.env.BABEL_ENV = 'production'
  const { default: webpackConfig } = await import('../config/prod.js')

  logWithSpinner('Building for production...\n')
  // The Webpack callback API closes the compiler before returning results.
  const stats = await new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
  stopSpinner(false)

  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n',
  )

  if (stats.hasErrors()) {
    throw new Error('Build failed with errors.')
  }
  done('Build complete.\n')
} catch (err) {
  stopSpinner(false)
  error(err)
  process.exitCode = 1
}
