const express = require('express')  
const router = express.Router()
const { isLoggedIn } = require('./auth')

const { getNewRequestNumber,getApproveRequestNumber,getInuseRequestNumber,getReturnedRequestNumber } = require('../controller/statistic')

router.get('/request/new',isLoggedIn,getNewRequestNumber)
router.get('/request/approve',isLoggedIn,getApproveRequestNumber)
router.get('/request/In_use',isLoggedIn,getInuseRequestNumber)
router.get('/request/returned',isLoggedIn,getReturnedRequestNumber)

module.exports = router