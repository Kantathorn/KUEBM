const mongoose = require('mongoose')

const JCSchema = mongoose.Schema({
    user :  { type: mongoose.Schema.Types.ObjectId, ref: "Users", default: null },
    club :  { type: mongoose.Schema.Types.ObjectId, ref: "Clubs", default: null },
    status: { type: String, required:true, enum: ['Requested','Approved','Rejected'] },
}, {timestamps: true, collection: 'JoinClubRequests'})

module.exports = mongoose.model("JoinClubRequests", JCSchema)
