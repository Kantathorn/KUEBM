const express = require('express')  
const router = express.Router()
const { isLoggedIn } = require('./auth')

const { newEquipmentCategory,addEquipment,getEquipmentByClub,changeStatus,getCategory } = require('../controller/equipment')

router.post('/category/new',isLoggedIn,newEquipmentCategory)
router.post('/new',isLoggedIn,addEquipment)
router.post('/list/byclub',isLoggedIn,getEquipmentByClub)
router.patch('/change/status',isLoggedIn,changeStatus)
router.get('/category',isLoggedIn,getCategory)

module.exports = router