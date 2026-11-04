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
        // Allow Vue scoped pseudo-classes while reporting other unknown pseudo-classes.
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
