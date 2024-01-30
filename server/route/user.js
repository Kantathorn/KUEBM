const express = require('express')  
const router = express.Router()
const { isLoggedIn } = require('./auth')

const { getUserRole } = require('../controller/user')

router.get('/role',isLoggedIn,getUserRole)
module.exports = router