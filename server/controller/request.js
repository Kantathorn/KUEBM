const Clubs = require('../models/Clubs')
const Users = require('../models/Users')
const Equipments = require('../models/Equipments')
const Requests = require('../models/Requests')

exports.createRequest = (req,res) => {
    const { request_to,description,collected_date,returned_date,item} = req.body
    const new_request = new Requests({
        requester : req.user._id,
        requester_club : req.user.club._id,
        request_to : request_to,
        status : "New",
        description : description,
        collected_date : collected_date,
        returned_date : returned_date,
        item : item
    })
    new_request.save().then(success => {
        return res.status(200).json({ "Message" : "Created Request Successful"})
    })
    .catch(err => {
        return res.status(400).json(err);
    });
}