const express = require('express')  
const router = express.Router()
const { isLoggedIn } = require('./auth')

const { createRequest } = require('../controller/request')

router.post('/create',isLoggedIn,createRequest);

module.exports = router