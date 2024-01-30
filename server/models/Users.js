const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    username:           { type: String, required:true, unique:true },
    email:              { type: String, required:true },
    first_name:         { type: String, required:true },
    last_name:          { type: String, required:true },
    student_id:         { type: String, required:true },
    phone_number:       { type: String, required:true },
    role:               { type: String, required:true, enum: ['SystemAdmin','ClubManager','EquipmentManager','User'] },
    club:               { type: mongoose.Schema.Types.ObjectId, ref: "Clubs", default: null }
},{timestamps: true, collection: 'Users'})

UserSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("Users", UserSchema)