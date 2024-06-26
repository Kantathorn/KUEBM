const express = require('express')  
const router = express.Router()
const { isLoggedIn } = require('./auth')

const { createRequest,getRequestByClub,getRequestById,getRequestByUser,approveRequest,cancelRequest,deliveredRequest,returnedRequest,getRequestByItem } = require('../controller/request')

router.post('/create',isLoggedIn,createRequest);
router.post('/list',isLoggedIn,getRequestByClub)
router.post('/user/list',isLoggedIn,getRequestByUser)
router.get('/:id',getRequestById)
router.patch('/approve',isLoggedIn,approveRequest)
router.patch('/cancel',isLoggedIn,cancelRequest)
router.patch('/deliver',isLoggedIn,deliveredRequest)
router.patch('/return',isLoggedIn,returnedRequest)
router.post('/item',isLoggedIn,getRequestByItem)

module.exports = router