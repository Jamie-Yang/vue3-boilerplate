export default {
  plugins: ['stylelint-order'],
  overrides: [
    {
      files: ['**/*.{css,pcss,postcss}'],
      extends: ['stylelint-config-standard'],
    },
    {
      files: ['**/*.{scss,vue}'],
      extends: ['stylelint-config-standard-scss'],
    },
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
      rules: {
        // Vue scoped 样式支持这些伪类，其他未知伪类仍需报错。
        'selector-pseudo-class-no-unknown': [
          true,
          { ignorePseudoClasses: ['deep', 'slotted', 'global'] },
        ],
      },
    },
  ],
  rules: {
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-order': ['width', 'height'],
  },
}
