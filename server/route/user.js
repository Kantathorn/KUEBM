const express = require('express')  
const router = express.Router()
const { isLoggedIn } = require('./auth')

const { getUserRole,getUserData } = require('../controller/user')

router.get('/role',isLoggedIn,getUserRole)
router.get('/info',isLoggedIn,getUserData)

module.exports = router