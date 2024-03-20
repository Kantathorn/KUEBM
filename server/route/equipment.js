const express = require('express')  
const router = express.Router()
const { isLoggedIn } = require('./auth')

const { newEquipmentCategory,addEquipment,getEquipmentByClub } = require('../controller/equipment')

router.post('/category/new',isLoggedIn,newEquipmentCategory)
router.post('/new',isLoggedIn,addEquipment)
router.post('/list/byclub',isLoggedIn,getEquipmentByClub)

module.exports = router