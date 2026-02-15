const db = require('../utils/db')
const auth = require('../middlewares/auth')
const jwt = require('jsonwebtoken')
const SECRET = 'jwt_secret_key'

const express = require('express')
const router = express.Router()
const R = require('../utils/response')

router.get('/info', async (req, res) => {
  const authHeader = req.headers['authorization']
  if (!authHeader) return res.status(401).json({ message: '未登录' })

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, SECRET)

    const [rows] = await db.query('SELECT * FROM sys_user')

    const user = rows.find(
      (u) => u.user_name === payload.username && u.id === payload.id,
    )
    console.log(user, payload, 'payload')

    user.roles = [user.roles]
    R.success(res, user)
  } catch (err) {
    // Token 过期或无效，返回 401 触发前端刷新 token 逻辑
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ code: 401, message: 'Token 已过期' })
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ code: 401, message: 'Token 无效' })
    }
    R.error(res, String(err), 500)
  }
})

module.exports = router
