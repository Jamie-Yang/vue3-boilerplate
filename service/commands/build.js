import loadEnv from '../utils/loadEnv.js'

import { rimraf } from 'rimraf'
import webpack from 'webpack'

import { error, done } from '../utils/logger.js'
import { logWithSpinner, stopSpinner } from '../utils/spinner.js'
import * as paths from '../utils/paths.js'
import config from '../project.config.js'

loadEnv('production')

// 动态加载 Webpack 配置，确保配置读取已初始化的环境变量。
const { default: webpackConfig } = await import('../config/prod.js')

logWithSpinner('Building for production...\n')

rimraf(paths.resolve(config.outputDir)).then(() => {
  webpack(webpackConfig, (err, stats) => {
    stopSpinner(false)

    if (err) throw err

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
      error('Build failed with errors.\n')
      process.exit(1)
    }

    done('Build complete.\n')
  })
})
