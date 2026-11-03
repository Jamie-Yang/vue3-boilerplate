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
      // how many loaders before css-loader should be applied to [@import]ed resources.
      // stylePostLoader injected by vue-loader + postcss-loader
      importLoaders: 1 + 1,
      modules: {
        /* 同时识别独立 CSS Modules 文件和 Vue 的 <style module> 请求。 */
        auto: (resourcePath, resourceQuery) =>
          /\.modules?\.\w+$/i.test(resourcePath) ||
          new URLSearchParams(resourceQuery).has('module'),
        // 类名映射通过默认导出提供给 Vue 和开发时的样式注入 loader。
        namedExport: false,
        exportLocalsConvention: 'as-is',
      },
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
