const ClubTypes = require('../models/ClubTypes')
const Clubs = require('../models/Clubs')

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
    const { name,type,email,address,register_pass } = req.body
    const new_club = new Clubs({
        name: name,
        type: type,
        email: email,
        address: address,
        register_pass: register_pass,
        status: 'Active',
        created_by: req.user._id,
        updated_by: req.user._id
    })
    new_club.save().then(success => {
        return res.status(200).json({ 'Message': 'Success'});
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