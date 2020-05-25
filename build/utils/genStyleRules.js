const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (options = {}) => {
  const isProd = process.env.NODE_ENV === 'production'

  const { sourceMap = false } = options

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap,
      // how many loaders before css-loader should be applied to [@import]ed resources.
      // stylePostLoader injected by vue-loader + postcss-loader
      importLoaders: 1 + 1,
    },
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap,
    },
  }

  function createCSSRule(test, loader, loaderOptions) {
    const loaders = [cssLoader, postcssLoader]

    if (isProd) {
      loaders.unshift({
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: !isProd,
        },
      })
    } else {
      loaders.unshift({
        loader: 'vue-style-loader',
        options: {
          sourceMap,
        },
      })
    }

    if (loader) {
      loaders.push({
        loader,
        options: Object.assign({ sourceMap }, loaderOptions),
      })
    }

    return { test, use: loaders }
  }

  return [
    createCSSRule(/\.css$/),
    createCSSRule(/\.p(ost)?css$/),
    createCSSRule(/\.scss$/, 'sass-loader'),
  ]
}
