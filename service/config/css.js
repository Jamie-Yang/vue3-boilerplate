import autoprefixer from 'autoprefixer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const isProd = process.env.NODE_ENV === 'production'

const plugins = []
if (isProd) {
  const filename = 'css/[name].[contenthash:8].css'

  plugins.push(
    new MiniCssExtractPlugin({
      filename,
      chunkFilename: filename,
    }),
  )
}

const genStyleRules = () => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      // Apply these loaders to @import resources as well.
      // stylePostLoader injected by vue-loader + postcss-loader
      importLoaders: 1 + 1,
      modules: false,
    },
  }
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [autoprefixer],
      },
    },
  }
  const extractPluginLoader = {
    loader: MiniCssExtractPlugin.loader,
  }
  const vueStyleLoader = {
    loader: 'vue-style-loader',
  }

  function createCSSRule(test, loader, loaderOptions) {
    const loaders = [cssLoader, postcssLoader]

    if (isProd) {
      loaders.unshift(extractPluginLoader)
    } else {
      loaders.unshift(vueStyleLoader)
    }

    if (loader) {
      loaders.push({ loader, options: loaderOptions })
    }

    return { test, use: loaders }
  }

  return [
    createCSSRule(/\.css$/),
    createCSSRule(/\.p(ost)?css$/),
    createCSSRule(/\.scss$/, 'sass-loader'),
  ]
}

export default {
  plugins,
  module: {
    rules: genStyleRules(),
  },
}
