export default {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false, // preserve ES modules.
      },
    ],
  ],
  plugins: [
    '@vue/babel-plugin-jsx',
    // Inject core-js polyfills based on usage and target browsers.
    [
      'babel-plugin-polyfill-corejs3',
      {
        method: 'usage-global',
        version: '3.51',
      },
    ],
    // Reuse helpers supported by the declared runtime version.
    [
      '@babel/plugin-transform-runtime',
      {
        version: '^8.1.0',
      },
    ],
  ],
  // Exclude the dependency package without matching application filenames.
  exclude: [/[\\/]node_modules[\\/]core-js[\\/]/],
}
