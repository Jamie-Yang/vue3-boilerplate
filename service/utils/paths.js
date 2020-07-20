'use strict'

const path = require('path')

// gen static file path
exports.getAssetPath = (...args) => path.posix.join('static', ...args)

// gen absolute path
exports.resolve = (...args) => path.posix.join(process.cwd(), ...args)
