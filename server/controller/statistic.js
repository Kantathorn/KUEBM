const Requests = require('../models/Requests');
const JoinClubRequests = require('../models/JoinClubRequests')
const Equipments = require('../models/Equipments')

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

exports.getClubRequest = (req,res) => {
    JoinClubRequests.find( {club: req.user.club,status:'Requested'} ).populate('user').populate('club').then((result) => {
        return res.status(200).json(result)
    }).catch((error) => {
        return res.status(404).json(error)
    })
}

exports.getAvailableEquipment = (req,res) => {
    Equipments.countDocuments({ owner:req.user.club,status:"Available" }).then((result) => {
        return res.status(200).json(result)
    }).catch((error) => {
        return res.status(404).json(error)
    })
}

exports.getInactiveEquipment = (req,res) => {
    Equipments.countDocuments({ owner:req.user.club,status:"Inactive" }).then((result) => {
        return res.status(200).json(result)
    }).catch((error) => {
        return res.status(404).json(error)
    })
}

exports.getInuseEquipment = (req,res) => {
    Equipments.countDocuments({ owner:req.user.club,status:"In-use" }).then((result) => {
        return res.status(200).json(result)
    }).catch((error) => {
        return res.status(404).json(error)
    })
}

exports.getPendingEquipment = (req,res) => {
    Equipments.countDocuments({ owner:req.user.club,status:"Pending" }).then((result) => {
        return res.status(200).json(result)
    }).catch((error) => {
        return res.status(404).json(error)
    })
}