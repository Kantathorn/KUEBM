const express = require('express')  
const router = express.Router()
const { isLoggedIn } = require('./auth')

const { createClubType,getClubType,deleteClubType,createClub,getClubList } = require('../controller/club')

router.post('/type/create',isLoggedIn,createClubType)
router.get('/type/list',isLoggedIn,getClubType)
router.delete('/type/delete',isLoggedIn,deleteClubType)
router.post('/create',isLoggedIn,createClub)
router.get('/list',isLoggedIn,getClubList)

module.exports = router