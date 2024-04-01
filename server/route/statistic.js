const express = require('express')  
const router = express.Router()
const { isLoggedIn } = require('./auth')

const { getNewRequestNumber,getApproveRequestNumber,getInuseRequestNumber,getReturnedRequestNumber,getClubRequest,getAvailableEquipment,getInactiveEquipment,getInuseEquipment,getPendingEquipment } = require('../controller/statistic')

router.get('/request/new',isLoggedIn,getNewRequestNumber)
router.get('/request/approve',isLoggedIn,getApproveRequestNumber)
router.get('/request/In_use',isLoggedIn,getInuseRequestNumber)
router.get('/request/returned',isLoggedIn,getReturnedRequestNumber)
router.get('/request/club/request',isLoggedIn,getClubRequest)
router.get('/equipment/available',isLoggedIn,getAvailableEquipment)
router.get('/equipment/inactive',isLoggedIn,getInactiveEquipment)
router.get('/equipment/inuse',isLoggedIn,getInuseEquipment)
router.get('/equipment/pending',isLoggedIn,getPendingEquipment)

module.exports = router