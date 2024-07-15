import globals from 'globals'
import js from '@eslint/js'
import pluginTs from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import configPrettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  ...pluginTs.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  configPrettier,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: 2024,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    rules: {
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    },
  },

  {
    files: ['service/**/*.js', '.prettierrc.js', '.stylelintrc.js', 'babel.config.js'],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  {
    ignores: ['dist'],
  },
]
