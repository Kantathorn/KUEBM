const mongoose = require('mongoose')

const ClubTypeSchema = mongoose.Schema({
    name:       { type: String, required:true, unique:true },
},{collection: 'ClubTypes'})

module.exports = mongoose.model("ClubTypes", ClubTypeSchema)