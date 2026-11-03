import globals from 'globals'
import js from '@eslint/js'
import pluginTs from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
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
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        // Vue 模板由 vue-eslint-parser 解析，script 中的 TS 交给 TS parser。
        parser: pluginTs.parser,
        extraFileExtensions: ['.vue'],
      },
    },
  },

  {
    ignores: ['dist'],
  },
]
