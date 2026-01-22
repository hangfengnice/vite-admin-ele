const express = require('express')
const router = express.Router()
const { getHello } = require('../controllers/helloController')

router.get('/', getHello)

module.exports = router
