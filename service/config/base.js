'use strict'

const { VueLoaderPlugin } = require('vue-loader')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const paths = require('../utils/paths')

const config = require('../project.config')

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
    path: paths.resolve(config.outputDir),
    publicPath: config.dev.publicPath,
    filename: genOutputFileName(),
    chunkFilename: genOutputFileName(),
  },

  resolve: {
    alias: {
      '@': paths.resolve('src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
  },

  plugins: [
    new ESLintPlugin({
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
      formatter: require('eslint-formatter-friendly'),
    }),
    new VueLoaderPlugin(),
    new CaseSensitivePathsPlugin(),
    new HTMLPlugin({
      template: paths.resolve('public/index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: paths.resolve('public'),
          to: paths.resolve(config.outputDir),
          toType: 'dir',
          globOptions: {
            ignore: ['.DS_Store', '**/index.html'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],

  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,

    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },

      {
        test: /\.m?jsx?$/,
        exclude: (file) => {
          // always transpile js in vue files
          if (/\.vue\.jsx?$/.test(file)) {
            return false
          }
          // Don't transpile node_modules
          return /node_modules/.test(file)
        },
        use: ['thread-loader', 'babel-loader'],
      },

      {
        test: /\.tsx?$/,
        use: [
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
        type: 'asset',
        generator: { filename: 'img/[hash][ext][query]' },
      },

      // do not base64-inline SVGs.
      // https://github.com/facebookincubator/create-react-app/pull/1180
      {
        test: /\.(svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: { filename: 'img/[hash][ext][query]' },
      },

      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        generator: { filename: 'media/[hash][ext][query]' },
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        generator: { filename: 'fonts/[hash][ext][query]' },
      },
    ],
  },
}
