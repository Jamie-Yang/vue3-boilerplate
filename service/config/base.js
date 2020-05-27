'use strict'
const { VueLoaderPlugin } = require('vue-loader')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const PnpPlugin = require(`pnp-webpack-plugin`)
const HTMLPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')

const paths = require('../utils/paths')

const config = require('../project.config')

const genUrlLoaderOptions = (dir) => ({
  limit: 8192,
  name: paths.getAssetPath(`${dir}/[name].[hash:8].[ext]`),
})

const genOutputFileName = () => {
  const isProd = process.env.NODE_ENV === 'production'
  return paths.getAssetPath(`js/[name]${isProd ? '.[contenthash:8]' : ''}.js`)
}

module.exports = {
  context: process.cwd(),

  entry: {
    app: './src/main.ts',
  },

  output: {
    path: config.outputDir,
    publicPath: config.dev.publicPath,
    filename: genOutputFileName(),
    chunkFilename: genOutputFileName(),
  },

  resolve: {
    alias: {
      '@': paths.resolve('src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
    plugins: [PnpPlugin],
  },

  resolveLoader: {
    plugins: [PnpPlugin.moduleLoader(module)],
  },

  plugins: [
    new VueLoaderPlugin(),
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsPlugin(),
    new HTMLPlugin({
      template: paths.resolve('public/index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: paths.resolve('public'),
          to: config.outputDir,
          toType: 'dir',
          globOptions: {
            ignore: ['.DS_Store'],
          },
        },
      ],
    }),
  ],

  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,

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

      // {
      //   test: /\.m?jsx?$/,
      //   exclude: (file) => {
      //     // always transpile js in vue files
      //     if (/\.vue\.jsx?$/.test(file)) {
      //       return false
      //     }
      //     // Don't transpile node_modules
      //     return /node_modules/.test(file)
      //   },
      //   use: ['cache-loader', 'thread-loader', 'babel-loader'],
      // },

      {
        test: /\.tsx?$/,
        use: [
          'cache-loader',
          'thread-loader',
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ['\\.vue$'],
              happyPackMode: true,
            },
          },
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
}
