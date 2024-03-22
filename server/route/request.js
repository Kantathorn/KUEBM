const express = require('express')  
const router = express.Router()
const { isLoggedIn } = require('./auth')

const { createRequest,getRequestByClub,getRequestById,getRequestByUser,approveRequest,cancelRequest } = require('../controller/request')

router.post('/create',isLoggedIn,createRequest);
router.post('/list',isLoggedIn,getRequestByClub)
router.post('/user/list',isLoggedIn,getRequestByUser)
router.get('/:id',getRequestById)
router.patch('/approve',isLoggedIn,approveRequest)
router.post('/cancel',isLoggedIn,cancelRequest)

module.exports = router