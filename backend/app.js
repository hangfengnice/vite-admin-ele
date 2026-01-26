const express = require('express')
const logger = require('./middlewares/logger')
const corsMiddleware = require('./middlewares/cors')
const errorHandler = require('./middlewares/errorHandler')

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const helloRouter = require('./routes/hello')
const tasksRouter = require('./routes/tasks')

const app = express()

// JSON 解析
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 日志
app.use(logger)

// CORS
app.use(corsMiddleware)

// 路由
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.use('/api/hello', helloRouter)
app.use('/api/tasks', tasksRouter)

const jwt = require('jsonwebtoken')
const SECRET = 'jwt_secret_key'

const router = express.Router()
const R = require('./utils/response')

app.get('/api/users', (req, res, next) => {
  let {
    query: { keyword },
  } = req

  const authHeader = req.headers['authorization']
  if (!authHeader) return res.status(401).json({ message: '未登录' })

  const token = authHeader.split(' ')[1]
  try {
    jwt.verify(token, SECRET)
    R.success(res, {
      total: users.length,
      list: users
        .filter((r) => r.username.includes(keyword))
        .map((u) => ({
          id: u.id,
          username: u.username,
          email: u.email,
          createdAt: new Date(),
        })),
    })
  } catch {
    next({ message: 'Token 过期或无效' })
  }
})

// 注册
app.post('/register', (req, res) => {
  const { username, password, email } = req.body
  const id = users.length + 1
  users.push({ id, username, password, email })
  res.json({ id, username, email })
})

// 新增用户
app.post('/api/users', (req, res) => {
  const { username, password, email } = req.body
  const id = users.length + 1
  users.push({ id, username, password, email, role: 'user' })
  R.success(res, { message: 'ok' })
})

// 更新用户
app.put('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find((u) => u.id === id)
  Object.assign(user, req.body)
  R.success(res, { message: 'ok' })
})

// 删除用户
app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  users = users.filter((u) => u.id !== id)
  R.success(res, { message: 'ok' })
})

// 错误处理
app.use(errorHandler)

module.exports = app
