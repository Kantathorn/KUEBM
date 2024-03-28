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

//Update Role
exports.updateUserRole = (req,res) => {
    const { user,role } = req.body
    Users.findOneAndUpdate({_id : user},{role : role}).then(result => {
        return res.status(200).json({ "Message" : "Change Role Successful"})
    }).catch(err => {
        return res.status(404).json(err)
    })
}