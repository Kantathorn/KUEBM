const ClubTypes = require('../models/ClubTypes')
const Clubs = require('../models/Clubs')
const Users = require('../models/Users')
const JoinClubRequests = require('../models/JoinClubRequests')
const joinClubRequestNotification = require('../utils/joinClubRequestNotification')
const cancelJoinClubNotification = require('../utils/cancelJoinClubNotification')
const approveJoinClubNotification = require('../utils/approveJoinClubNotification')

//Create New Club type
exports.createClubType = (req,res) => {
    const { name } = req.body
    const new_types = new ClubTypes({
        name: name
    })
    new_types.save().then(success => {
        return res.status(200).json({ 'Message': 'Success'});
    })
    .catch(err => {
        return res.status(400).json(err);
    });
}

//Get all club type
exports.getClubType = (req,res) => {
    ClubTypes.find().then(result => {
        return res.json(result)
    }).catch(err => {
        return res.status(404).json(err)
    })
}

//Delete Club Type
exports.deleteClubType = (req,res) => {
    const { type_id } = req.body
    ClubTypes.findOneAndDelete({_id: type_id}).then(success => {
        return res.status(200).json({ 'Message': 'Success'});
    })
    .catch(err => {
        return res.status(400).json(err);
    });
}

//Create Club
exports.createClub = (req,res) => {
    const { name,type,email,address,promptPay } = req.body
    const new_club = new Clubs({
        name: name,
        type: type,
        email: email,
        address: address,
        promptPay: promptPay,
        status: 'Active',
        created_by: req.user._id,
        updated_by: req.user._id
    })
    new_club.save().then(success => {
        Users.findOneAndUpdate({'_id' : req.user._id },{'club':success._id}).then(result => {
            return res.status(200).json({ "Message" : "Create Clubs Successful"})
        }).catch(err2 => {
            return res.status(404).json(err2)
        })
    })
    .catch(err => {
        return res.status(400).json(err);
    });
}

//Get List of Clubs
exports.getClubList = (req,res) => {
    Clubs.find().populate('type').populate('created_by').populate('updated_by').then(result => {
        return res.status(200).json(result)
    }).catch(err => {
        return res.status(404).json(err)
    })
}

//Choose Clubs
exports.chooseClubRequest = (req,res) => {
    const { user,club } = req.body
    Clubs.findOne({ _id:club }).then(result => {
        if (result == null){
            return res.status(404).json({ "Message" : "No Club"})
        }
        else {
            const new_request = new JoinClubRequests({
                user : user,
                club : result._id,
                status : "Requested"
            })
            new_request.save().then(success => {
                JoinClubRequests.findOne({ _id:success._id}).populate('user').populate('club').then((result => {
                    Users.findOne( { club:success.club,role:"ClubManager" } ).then((result2 => {
                        joinClubRequestNotification(result,result2)
                        return res.status(200).json("Success")
                    }))
                }))
            })
        }
    }).catch(err => {
        return res.status(404).json(err)
    })
}

//Get Clubs Member
exports.getClubMember = (req,res) => {
    const { club } = req.body
    Users.find({club:club}).populate('club').then(result => {
        return res.json(result)
    }).catch(err => {
        return res.status(404).json(err)
    })
}

exports.getRequestById = (req,res) => {
    const id = req.params.id
    JoinClubRequests.findOne({_id:id}).populate('user').populate('club').then(result => {
        return res.status(200).json(result)
    }).catch(err => {
        return res.status(404).json(err)
    })
}

//Check User Request
exports.getRequestByUser = (req,res) => {
    JoinClubRequests.findOne({ user:req.user._id,status:"Requested"}).populate('user').populate('club').then(result => {
        return res.status(200).json(result)
    }).catch(err => {
        return res.status(404).json(err)
    })
}

//Approve Choose Club Request
exports.approveChooseClub = (req,res) => {
    const { request_id } = req.body
    JoinClubRequests.findOneAndUpdate({ _id:request_id }, { status:"Approved"}).populate('user').populate('club').then(result => {
        Users.findOneAndUpdate({ _id:result.user}, {club:result.club}).then(result2 => {
            approveJoinClubNotification(result,req.user)
            return res.json(result)
        })
    })
}

//Reject Choose Club Request
exports.rejectChooseClub = (req,res) => {
    const { request_id } = req.body
    JoinClubRequests.findOneAndUpdate({ _id:request_id }, { status:"Rejected"}).populate('user').populate('club').then(result => {
        Users.findOne( { club:result.club,role:"ClubManager" } ).then((result2 => {
            cancelJoinClubNotification(result,result2,req.user)
            return res.status(200).json("Rejected Approve")
        }))
    })
}

//Remove Club Member
exports.removeMember = (req,res) => {
    const { user } = req.body
    Users.findOneAndUpdate({ _id:user }, { club:null,role:"User" }).then((result) => {
        return res.status(200).json(result)
    }).catch((error) => {
        return res.status(404).json(error)
    })
}

//Get Club Profile
exports.getClubProfile = (req,res) => {
    Clubs.findOne({ _id:req.user.club }).populate('type').populate('created_by').populate('updated_by').then((result) => {
        return res.status(200).json(result)
    }).catch((error) => {
        return res.status(404).json(error)
    })
}

//Change Club Profile
exports.changeClubProfile = (req,res) => {
    const { club_id,email,address,promptPay } = req.body
    Clubs.findOneAndUpdate({_id:club_id},{email:email,address:address,promptPay:promptPay}).then((result) => {
        return res.status(200).json({ 'Message': 'Success'});
    })
    .catch(err => {
        return res.status(400).json(err);
    });
}