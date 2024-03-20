const express = require('express')  
const router = express.Router()
const { isLoggedIn } = require('./auth')

const { getUserRole,getUserData,updateUserRole } = require('../controller/user')

router.get('/role',isLoggedIn,getUserRole)
router.get('/info',isLoggedIn,getUserData)
router.patch('/change/role',isLoggedIn,updateUserRole)

module.exports = router