const express = require('express')  
const router = express.Router()
const { isLoggedIn } = require('./auth')

const { createClubType,getClubType,deleteClubType,createClub,getClubList,chooseClubRequest,getClubMember,getRequestById,approveChooseClub,rejectChooseClub,getRequestByUser } = require('../controller/club')

router.post('/type/create',isLoggedIn,createClubType)
router.get('/type/list',isLoggedIn,getClubType)
router.delete('/type/delete',isLoggedIn,deleteClubType)
router.post('/create',isLoggedIn,createClub)
router.get('/list',isLoggedIn,getClubList)
router.post('/change',isLoggedIn,chooseClubRequest)
router.post('/member',isLoggedIn,getClubMember)
router.get('/join_request/byid/:id',getRequestById)
router.patch('/join_request/approve',isLoggedIn,approveChooseClub)
router.post('/join_request/cancel',isLoggedIn,rejectChooseClub)
router.get('/join_request/user',isLoggedIn,getRequestByUser)

module.exports = router