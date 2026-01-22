const express = require('express')
const router = express.Router()
const { getUsers } = require('../controllers/userController')
const auth = require('../middlewares/auth')
// router.get('/', auth, getUsers) // 需要权限验证

module.exports = router
