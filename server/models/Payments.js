const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    request:            { type: mongoose.Schema.Types.ObjectId, ref: "Requests", default: null},
    type:               { type: String, required:true, enum: ['Deposite','Fine'] },
    pay_to:             { type: String, required: true }, // หมายเลขบัญชีปลายทาง
    pay_from:           { type: String, required:true  }, //ชื่อบัญชีผู้จ่าย
    amount:             { type: String, required: true },
    transaction_date:   { type: Date, required:true },  //วันที่โอน
    slip_number:        { type: String, required: true }, //หมายเลขสลิป
    created_by:         { type: mongoose.Schema.Types.ObjectId, ref: "Users", default: null },
},{timestamps: true, collection: 'Payments'})

module.exports = mongoose.model("Payments", PaymentSchema)