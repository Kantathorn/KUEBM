const mongoose = require('mongoose')

const ClubSchema = new mongoose.Schema({
    name:           { type: String, required:true, unique:true },
    type:           { type: mongoose.Schema.Types.ObjectId, ref: "ClubTypes", default: null },
    email:          { type: String, required:true },
    address:        { type: String, required:true },
    register_pass:  { type: String, required:true },
    status:         { type: String, required:true, enum: ['Active','Inactive'] },
    created_by:     { type: mongoose.Schema.Types.ObjectId, ref: "Users", default: null },
    updated_by:     { type: mongoose.Schema.Types.ObjectId, ref: "Users", default: null }
},{timestamps: true, collection: 'Clubs'})

module.exports = mongoose.model("Clubs", ClubSchema)