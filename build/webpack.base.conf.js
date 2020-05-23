'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.ts',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(vue|(j|t)sx?)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          cache: true,
          cacheIdentifier: '', // TODO
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
          // formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.m?jsx?$/,
        loader: 'babel-loader',
        exclude: (filePath) => {
          // always transpile js in vue files
          if (/\.vue\.jsx?$/.test(filePath)) {
            return false
          }
          // Don't transpile node_modules
          return /node_modules/.test(filePath)
        },
      },
    ],
  },
}
