const express = require('express')
const ControllerUser = require('../controllers/ControllerUser')
const router = express.Router()

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)

module.exports = router