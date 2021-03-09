module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  ignoreFiles: ['node_modules/**', 'src/assets/font/**', 'src/assets/style/reset.css'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'ignores', 'include', 'mixin', 'if', 'else', 'media', 'for'],
      },
    ],
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-order': ['width', 'height'],
  },
}
