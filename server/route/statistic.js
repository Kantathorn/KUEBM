const express = require('express')  
const router = express.Router()
const { isLoggedIn } = require('./auth')

const { getNewRequestNumber } = require('../controller/statistic')

router.get('/request/new',isLoggedIn,getNewRequestNumber)

module.exports = router