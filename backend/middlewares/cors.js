const cors = require('cors')
module.exports = cors({
  origin: '*', // 可改成指定域名
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})
