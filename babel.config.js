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
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true, // TODO: need test
      },
    ],
  ],
  exclude: [/core-js/],
}
