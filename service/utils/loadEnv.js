import path from 'node:path'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

/* 合并环境文件后统一展开变量，保留 shell 中已有值的最高优先级。 */
export default function loadEnv(mode) {
  const filenames = ['.env', '.env.local']
  if (mode) {
    filenames.push(`.env.${mode}`, `.env.${mode}.local`)
  }

  const parsed = {}
  for (const filename of filenames) {
    const result = dotenv.config({
      path: path.resolve(process.cwd(), filename),
      processEnv: {},
      quiet: true,
    })
    if (result.error) {
      if (result.error.code === 'ENOENT') continue
      throw result.error
    }
    Object.assign(parsed, result.parsed)
  }

  const processEnv = { ...parsed, ...process.env }
  dotenvExpand.expand({ parsed, processEnv })
  for (const key of Object.keys(parsed)) {
    if (!Object.hasOwn(process.env, key)) {
      process.env[key] = processEnv[key]
    }
  }

  if (mode) {
    const defaultNodeEnv = mode === 'production' || mode === 'test' ? mode : 'development'
    process.env.NODE_ENV ??= defaultNodeEnv
    process.env.BABEL_ENV ??= defaultNodeEnv
  }
}
