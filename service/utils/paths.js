import path from 'path'

// gen static file path
export const getAssetPath = (...args) => path.posix.join('static', ...args)

// gen absolute path
export const resolve = (...args) => path.posix.join(process.cwd(), ...args)
