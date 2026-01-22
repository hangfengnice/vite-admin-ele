const express = require('express')
const logger = require('./middlewares/logger')
const corsMiddleware = require('./middlewares/cors')
const errorHandler = require('./middlewares/errorHandler')

const helloRouter = require('./routes/hello')
const userRouter = require('./routes/user')
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
app.use('/api/hello', helloRouter)
app.use('/api/user', userRouter)

app.use('/api/tasks', tasksRouter)

const jwt = require('jsonwebtoken')
const SECRET = 'jwt_secret_key'

// 模拟数据库
let users = [
  { id: 1, username: 'hf', password: '1', role: 'admin', email: 'hf@qq.com' },
  { id: 2, username: 'user', password: '1', role: 'user', email: 'hf@qq.com' },
]

const router = express.Router()
const R = require('./utils/response')

app.get('/api/users', (req, res, next) => {
  console.log(req, 'req')
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

app.post('/api/user/info', (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (!authHeader) return res.status(401).json({ message: '未登录' })

  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, SECRET)
    R.success(res, {
      id: payload.id,
      username: payload.username,
      role: payload.role,
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

// 登录
app.post('/api/login', (req, res) => {
  const { username, password } = req.body

  console.log(req, res, 'rs')

  const user = users.find(
    (u) => u.username === username && u.password === password
  )
  if (!user) return res.status(401).json({ message: '用户名或密码错误' })

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
    expiresIn: '240h',
  })
  R.success(res, { ...user, token })
})

// 错误处理
app.use(errorHandler)

module.exports = app
