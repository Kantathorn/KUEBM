const Requests = require('../models/Requests');

// Get Number of New Request
exports.getNewRequestNumber = (req,res) => {
    Requests.countDocuments({ request_to: req.user.club,status: "New"}).then((result) => {
        return res.status(200).json(result)
    }).catch((error) => {
        return res.status(404).json(error)
    })
}

// Get Number of Approve Request
exports.getApproveRequestNumber = (req,res) => {
    Requests.countDocuments({ request_to: req.user.club,status: "Approve"}).then((result) => {
        return res.status(200).json(result)
    }).catch((error) => {
        return res.status(404).json(error)
    })
}

// Get Number of In-use Request
exports.getInuseRequestNumber = (req,res) => {
    Requests.countDocuments({ request_to: req.user.club,status: "In-use"}).then((result) => {
        return res.status(200).json(result)
    }).catch((error) => {
        return res.status(404).json(error)
    })
}

// Get Number of Returned Request
exports.getReturnedRequestNumber = (req,res) => {
    Requests.countDocuments({ request_to: req.user.club,status: "Returned"}).then((result) => {
        return res.status(200).json(result)
    }).catch((error) => {
        return res.status(404).json(error)
    })
}