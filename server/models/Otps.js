const mongoose = require('mongoose')

const OtpSchema = mongoose.Schema({
    email: { type: String, required: true },
    otp:    { type: String, required: true },
    createAt: {type: Date, default: Date.now, expires: 60*5}
}, {collection: 'Otps'})

module.exports = mongoose.model("Otps", OtpSchema)
