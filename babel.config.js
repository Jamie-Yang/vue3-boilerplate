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
      },
    ],
    // 按项目声明的 runtime 版本复用辅助函数。
    [
      '@babel/plugin-transform-runtime',
      {
        version: '^8.1.0',
      },
    ],
  ],
  // 仅排除依赖包，避免误匹配业务文件路径。
  exclude: [/[\\/]node_modules[\\/]core-js[\\/]/],
}
