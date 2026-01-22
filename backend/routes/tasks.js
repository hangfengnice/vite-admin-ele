const express = require('express')
const db = require('../db')
const R = require('../utils/response')

const router = express.Router()

// 获取所有任务
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks')
    R.success(res, rows)
  } catch (err) {
    next(err)
  }
})

// 新增任务
router.post('/', async (req, res, next) => {
  try {
    const title = req.body.title
    const [result] = await db.query('INSERT INTO tasks (title) VALUES (?)', [
      title,
    ])
    R.success(res, { id: result.insertId, title, completed: 0 }, '创建成功')
  } catch (err) {
    next(err)
  }
})

// 更新任务
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const completed = req.body.completed
    await db.query('UPDATE tasks SET completed=? WHERE id=?', [completed, id])
    R.success(res, { id, completed }, '更新成功')
  } catch (err) {
    next(err)
  }
})

// 删除任务
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await db.query('DELETE FROM tasks WHERE id=?', [id])
    R.success(res, { id }, '删除成功')
  } catch (err) {
    next(err)
  }
})

module.exports = router
