'use strict'
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('./config')
const genStyleRules = require('./utils/genStyleRules')
const getAssetPath = require('./utils/getAssetPath')

const resolve = (dir) => path.join(__dirname, '..', dir)

const genUrlLoaderOptions = (dir) => ({
  limit: 8192,
  name: getAssetPath(`${dir}/[name].[hash:8].[ext]`),
})

const webpackConfig = {
  mode: 'development',

  context: path.resolve(__dirname, '../'),

  entry: {
    app: './src/main.ts',
  },

  output: {
    path: config.outputDir,
    filename: '[name].js',
    publicPath: config.dev.publicPath,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },

  plugins: [new VueLoaderPlugin()],

  module: {
    noParse: /^(vue|vue-router|vuex)$/,

    rules: [
      {
        test: /\.(vue|(j|t)sx?)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          cache: true,
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
          formatter: require('eslint-friendly-formatter'),
        },
      },

      {
        test: /\.vue$/,
        use: ['cache-loader', 'vue-loader'],
      },

      {
        test: /\.m?jsx?$/,
        exclude: (filePath) => {
          // always transpile js in vue files
          if (/\.vue\.jsx?$/.test(filePath)) {
            return false
          }
          // Don't transpile node_modules
          return /node_modules/.test(filePath)
        },
        use: [
          'cache-loader',
          {
            loader: 'thread-loader',
            options: {
              workers: 4, // TODO
            },
          },
          'babel-loader',
        ],
      },

      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        loader: 'url-loader',
        options: genUrlLoaderOptions('img'),
      },

      // do not base64-inline SVGs.
      // https://github.com/facebookincubator/create-react-app/pull/1180
      {
        test: /\.(svg)(\?.*)?$/,
        loader: 'file-loader',
        options: genUrlLoaderOptions('img'),
      },

      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: genUrlLoaderOptions('media'),
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        options: genUrlLoaderOptions('fonts'),
      },
    ],
  },

  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // process is injected via DefinePlugin, although some 3rd party
    // libraries may require a mock to work properly (#934)
    process: 'mock',
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
}

webpackConfig.module.rules.concat(genStyleRules())

module.exports = webpackConfig
