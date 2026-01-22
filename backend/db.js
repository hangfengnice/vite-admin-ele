const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost', // 本地或者 ECS IP
  user: '', // 数据库用户名
  password: '', // root 密码
  database: 'test_db', // 我们创建的数据库
  waitForConnections: true,
  connectionLimit: 10,
})

module.exports = pool
