const mongoose = require('mongoose')

const EquipmentSchema = mongoose.Schema({
    fsn:        { type: String, required:true, unique:true },
    name:       { type: String, required:true },
    detail:     { type: String, required:true },
    category:   { type: mongoose.Schema.Types.ObjectId, ref: "EquipmentCategories", default: null },
    owner:      { type: mongoose.Schema.Types.ObjectId, ref: "Clubs", default: null},
    cost:       { type: String, required:true },
    status:     { type: String, required:true, enum: ['Available','Pending','Borrowing','Inactive'] },
    created_by:     { type: mongoose.Schema.Types.ObjectId, ref: "Users", default: null },
    updated_by:     { type: mongoose.Schema.Types.ObjectId, ref: "Users", default: null }
},{timestamps: true, collection: 'Equipments'})

module.exports = mongoose.model("Equipments", EquipmentSchema)