const express = require('express')  
const router = express.Router()
const { isLoggedIn } = require('./auth')

const { createRequest,getRequestByClub,getRequestById } = require('../controller/request')

router.post('/create',isLoggedIn,createRequest);
router.post('/list',isLoggedIn,getRequestByClub)
router.get('/:id',getRequestById)

module.exports = router