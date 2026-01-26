const db = require('../utils/db')
const auth = require('../middlewares/auth')
const jwt = require('jsonwebtoken')
const SECRET = 'jwt_secret_key'

const express = require('express')
const router = express.Router()
const R = require('../utils/response')

router.post('/login', async (req, res) => {
  console.log(req.body, 'req')
  const { username, password } = req.body

  try {
    const [rows] = await db.query('SELECT * FROM sys_user')

    console.log(rows, 'rs')

    const user = rows.find(
      (u) => u.user_name === username && u.password === password,
    )
    if (!user) return res.status(401).json({ message: '用户名或密码错误' })

    const token = jwt.sign({ id: user.id, username: user.user_name }, SECRET, {
      expiresIn: '240h',
    })
    R.success(res, { ...user, token })
  } catch (err) {
    R.error(res, err, 500)
  }
})

module.exports = router
