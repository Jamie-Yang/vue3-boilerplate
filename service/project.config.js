'use strict'

module.exports = {
  outputDir: 'dist',

  dev: {
    publicPath: '/',
    port: 8080,
  },

  build: {
    publicPath: '/',
  },

  pwa: {
    workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
    workboxOptions: {},
    name: 'PWA app',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'no',
    appleMobileWebAppStatusBarStyle: 'default',
    assetsVersion: '',
    manifestPath: 'manifest.json',
    manifestOptions: {},
    manifestCrossorigin: undefined,
    iconPaths: {},
  },
}
