const Users = require('../models/Users')

//Get User Role
exports.getUserRole = (req,res) => {
    return res.status(200).json(req.user.role)
}

//Get User Data
exports.getUserData = (req,res) => {
    Users.findOne({'_id' : req.user._id }).populate('club').then(result => {
        return res.json(result)
    }).catch(err => {
        return res.status(404).json(err)
    })
}