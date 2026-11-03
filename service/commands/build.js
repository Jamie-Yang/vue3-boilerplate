import loadEnv from '../utils/loadEnv.js'
import { rimraf } from 'rimraf'
import webpack from 'webpack'

import { error, done } from '../utils/logger.js'
import { logWithSpinner, stopSpinner } from '../utils/spinner.js'
import * as paths from '../utils/paths.js'
import config from '../project.config.js'

try {
  loadEnv('production')
  // 命令模式与 Babel、样式配置保持一致，不受外部 NODE_ENV 覆盖。
  process.env.NODE_ENV = 'production'
  process.env.BABEL_ENV = 'production'
  const { default: webpackConfig } = await import('../config/prod.js')

  logWithSpinner('Building for production...\n')
  await rimraf(paths.resolve(config.outputDir))
  // Webpack 的回调 API 会在返回结果前关闭 compiler。
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
