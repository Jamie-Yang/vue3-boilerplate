export default () => ({
  terserOptions: {
    compress: {
      // 禁用以下压缩变换，减少压缩耗时。
      arrows: false,
      collapse_vars: false,
      comparisons: false,
      computed_props: false,
      hoist_funs: false,
      hoist_props: false,
      hoist_vars: false,
      inline: false,
      loops: false,
      negate_iife: false,
      properties: false,
      reduce_funcs: false,
      reduce_vars: false,
      switches: false,
      toplevel: false,
      typeofs: false,

      // 启用布尔表达式、条件返回、表达式合并及未使用代码压缩。
      booleans: true,
      if_return: true,
      sequences: true,
      unused: true,

      // 简化条件表达式并移除不可达分支。
      conditionals: true,
      dead_code: true,
      evaluate: true,
    },
    mangle: {
      safari10: true,
    },
  },
  extractComments: false,
})
