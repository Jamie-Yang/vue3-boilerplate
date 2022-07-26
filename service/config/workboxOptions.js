'use strict'

module.exports = (options) => {
  const defaultOptions = {
    exclude: [/\.map$/, /img\/icons\//, /favicon\.ico$/, /^manifest.*\.js?$/],
  }

  const defaultGenerateSWOptions =
    options.workboxPluginMode === 'GenerateSW' ? { cacheId: options.name } : {}

  return Object.assign(defaultOptions, defaultGenerateSWOptions, options.workboxOptions)
}
