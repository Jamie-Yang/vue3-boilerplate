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
    files: ['src/**/*.{js,jsx,ts,tsx,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        // Webpack substitutes process.env values in client code.
        process: 'readonly',
      },
    },
  },

  {
    files: [
      'service/**/*.js',
      '.prettierrc.js',
      '.stylelintrc.js',
      'babel.config.js',
      'eslint.config.mjs',
    ],

    languageOptions: {
      globals: globals.nodeBuiltin,
    },
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        // Parse Vue templates with vue-eslint-parser and scripts with the TS parser.
        parser: pluginTs.parser,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      // vue-tsc checks undeclared identifiers in TypeScript Vue scripts.
      'no-undef': 'off',
    },
  },

  {
    ignores: ['dist'],
  },
]
