import path from 'path'

// Generate a path under the static assets directory.
export const getAssetPath = (...args) => path.posix.join('static', ...args)

// Resolve relative to the project working directory.
export const resolve = (...args) => path.posix.join(process.cwd(), ...args)
