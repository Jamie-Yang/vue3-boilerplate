module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        modules: false,
        corejs: 3,
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
  exclude: [/core-js/],
}
