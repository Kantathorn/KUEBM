const express = require('express')  
const router = express.Router()
const { isLoggedIn } = require('./auth')

const { createPayment,getPaymenByRequest } = require('../controller/payment')

router.post('/new',isLoggedIn,createPayment)
router.post('/byid',isLoggedIn,getPaymenByRequest)

module.exports = router