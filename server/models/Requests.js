const mongoose = require('mongoose')

const RequestSchema = mongoose.Schema({
    request_number:    { type: String, required:true },
    requester:          { type: mongoose.Schema.Types.ObjectId, ref: "Users", default: null },
    requester_club:     { type: mongoose.Schema.Types.ObjectId, ref: "Clubs", default: null},
    request_to:         { type: mongoose.Schema.Types.ObjectId, ref: "Clubs", default: null},
    status:             { type: String, required:true, enum: ['New','Approve','Reject','In-Use','Returned','Cancel'] },
    approver:           { type: mongoose.Schema.Types.ObjectId, ref: "Users", default: null },
    description:        { type: String, required:true },
    collected_date:     { type: Date, default: null },
    use_date:           { type: Date, required:true },
    returned_date:      { type: Date, required:true },
    deposite:           { type: String, default: "0" },
    fine:               { type: String, default: "0" },
    item:               { type: mongoose.Schema.Types.ObjectId, ref: "Equipments", default: null },
    note:               { type: String, default: null}
},{timestamps: true, collection: 'Requests'})

module.exports = mongoose.model("Requests", RequestSchema)