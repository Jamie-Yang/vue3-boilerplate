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
    // 根据代码使用情况和目标浏览器，按需引入 core-js polyfill。
    [
      'babel-plugin-polyfill-corejs3',
      {
        method: 'usage-global',
        version: '3.51',
        proposals: true,
      },
    ],
    '@babel/plugin-transform-runtime', // enables the re-use of Babel's injected helper code to save on codesize.
  ],
  exclude: [/core-js/],
}
