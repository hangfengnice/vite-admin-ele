const db = require('../utils/db')
const { success, error } = require('../utils/response')

exports.getUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email FROM users')
    success(res, rows)
  } catch (err) {
    console.log(err, 'err')

    if (err.code === 'ER_NO_SUCH_TABLE') {
      // 表不存在 → 创建
      await db.query(`
        CREATE TABLE users (
          id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(50),
          email VARCHAR(100)
        )
      `)
      // 创建完再查一次
      const [rows] = await db.query('SELECT id,name,email FROM users')
      return rows
    }
    error(res, 500, err)
  }
}
