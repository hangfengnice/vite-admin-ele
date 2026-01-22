const { success } = require('../utils/response')

exports.getHello = (req, res) => {
  success(res, { message: 'Hello from Node.js API!' })
}
