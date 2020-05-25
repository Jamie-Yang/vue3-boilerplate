const path = require('path')

module.exports = (filePath) => {
  return path.posix.join('static', filePath)
}
