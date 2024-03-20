const mongoose = require('mongoose')

const EquipmentCategorySchema = mongoose.Schema({
    name:       { type: String, required:true, unique:true },
},{collection: 'EquipmentCategories'})

module.exports = mongoose.model("EquipmentCategories", EquipmentCategorySchema)