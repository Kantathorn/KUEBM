const Payments = require('../models/Payments')

exports.createPayment = (req,res) => {
    const { request,type,pay_to,pay_from,amount,transaction_date,slip_number } = req.body
    const new_payment = new Payments({
        request: request,
        type:   type,
        pay_to: pay_to,
        pay_from: pay_from,
        amount: amount,
        transaction_date: transaction_date,
        slip_number: slip_number,
        created_by: req.user._id
    })
    new_payment.save().then(success => {
        return res.status(200).json({ "Message" : "Create Payments Successful"})
    })
    .catch(err => {
        return res.status(400).json(err);
    });
}

exports.getPaymenByRequest = (req,res) => {
    const { paymentId } = req.body
    Payments.findOne({ _id:paymentId }).populate("request").populate("created_by").then(result => {
        return res.json(result)
    }).catch(err => {
        return res.status(404).json(err)
    })
}