'use strict'
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const PnpPlugin = require(`pnp-webpack-plugin`)
const HTMLPlugin = require('html-webpack-plugin')
const PreloadPlugin = require('preload-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const genStyleRules = require('./utils/genStyleRules')
const getAssetPath = require('./utils/getAssetPath')

const config = require('./config')
const terserOptions = require('./terserOptions')

const resolve = (dir) => path.join(__dirname, '..', dir)

const genUrlLoaderOptions = (dir) => ({
  limit: 8192,
  name: getAssetPath(`${dir}/[name].[hash:8].[ext]`),
})

const genOutputFileName = () => {
  console.log(process.env.NODE_ENV)

  const isProd = process.env.NODE_ENV === 'production'
  return getAssetPath(`js/[name]${isProd ? '.[contenthash:8]' : ''}.js`)
}

module.exports = {
  context: resolve(''),

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
      '@': resolve('src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
    plugins: [PnpPlugin],
  },

  resolveLoader: {
    plugins: [PnpPlugin.moduleLoader(module)],
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(terserOptions())],
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
      },
    },
  },

  plugins: [
    new VueLoaderPlugin(),
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsPlugin(),
    new HTMLPlugin({
      template: resolve('/public/index.html'),
    }),
    // new PreloadPlugin({
    //   rel: 'preload',
    //   include: 'initial',
    //   fileBlacklist: [/\.map$/, /hot-update\.js$/],
    // }),
    // new PreloadPlugin({
    //   rel: 'prefetch',
    //   include: 'asyncChunks',
    // }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve('public'),
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
      // {
      //   test: /\.(vue|(j|t)sx?)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   options: {
      //     cache: true,
      //     extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
      //     formatter: require('eslint-friendly-formatter'),
      //   },
      // },

      {
        test: /\.vue$/,
        use: ['cache-loader', 'vue-loader'],
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
        use: ['cache-loader', 'thread-loader', 'babel-loader'],
      },

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

      ...genStyleRules(),
    ],
  },
}
