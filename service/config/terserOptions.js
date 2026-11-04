export default () => ({
  terserOptions: {
    compress: {
      // Disable these transforms to reduce minification time.
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

      // Simplify booleans, conditional returns, sequences, and unused code.
      booleans: true,
      if_return: true,
      sequences: true,
      unused: true,

      // Simplify conditions and remove unreachable branches.
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
