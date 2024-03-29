const Requests = require('../models/Requests');

// Get Number of New Request
exports.getNewRequestNumber = (req,res) => {
    Requests.countDocuments({ request_to: req.user.club,status: "New"}).then((result) => {
        return res.status(200).json(result)
    }).catch((error) => {
        return res.status(404).json(error)
    })
} 