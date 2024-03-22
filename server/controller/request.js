const Clubs = require('../models/Clubs');
const Users = require('../models/Users');
const Equipments = require('../models/Equipments');
const Requests = require('../models/Requests');
const Counters = require('../models/Counters');
const sendEmailNotification = require('../utils/createRequestNotification');
const sendApproveEmailNotification = require('../utils/approveRequestNotification');

// Create Request
exports.createRequest = async (req, res) => {
    try {
        const { request_to, description, use_date, returned_date, item, ownerMail } = req.body;

        // Get the current sequence value and increment it
        const counter = await Counters.findByIdAndUpdate(
            { _id: 'requestNumber' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        // Use the incremented value as the request number
        const requestNumber = counter.sequence_value;

        // Create a new request with the generated request number
        const new_request = new Requests({
            request_number: requestNumber,
            requester: req.user._id,
            requester_club: req.user.club._id,
            request_to: request_to,
            status: "New",
            description: description,
            use_date: use_date,
            returned_date: returned_date,
            item: item._id
        });

        // Save the request
        await new_request.save();

        // Send email notification
        sendEmailNotification(req.user.email,ownerMail,new_request,requestNumber,item);

        return res.status(200).json({ "Message": "Created Request Successful" });
    } catch (error) {
        console.error('Error creating request:', error);
        return res.status(400).json({ "Error": "Failed to create request" });
    }
};

//Get All Request by club
exports.getRequestByClub = (req,res) => {
    const { club } = req.body
    Requests.find({ request_to: club }).populate("requester").populate("requester_club").populate("request_to").populate("approver").populate("item").then(result => {
        return res.status(200).json(result)
    }).catch(err => {
        return res.status(404).json(err)
    })
}

//Get Request by ID (Not Require to login
exports.getRequestById = (req,res) => {
    const id = req.params.id
    Requests.findOne({ _id:id }).populate("requester").populate("requester_club").populate("request_to").populate("approver").populate("item").then(result => {
        return res.status(200).json(result)
    }).catch(err => {
        return res.status(404).json(err)
    })
}

//Get All Request by user
exports.getRequestByUser = (req,res) => {
    const { user } = req.body
    Requests.find({ requester: user }).populate("requester").populate("requester_club").populate("request_to").populate("approver").populate("item").then(result => {
        return res.status(200).json(result)
    }).catch(err => {
        return res.status(404).json(err)
    })
}

//Approve Request
exports.approveRequest = (req,res) => {
    const { request_id, deposite, note, collected_date } = req.body
    if (note !== ""){
        Requests.findOneAndUpdate({ _id:request_id }, { 
            status: "Approve",
            approver: req.user._id,
            collected_date: collected_date,
            deposite: deposite,
            note: note
        }).populate('requester').populate('request_to').populate('approver').then(result => {
            // return res.status(200).json(result)
            sendApproveEmailNotification(result,collected_date)
            return res.status(200).json({ "Message" : "Request Approved"})
            // return res.status(200).json(result)
        }).catch(err => {
            return res.status(404).json(err)
        })
    }
    else {
        Requests.findOneAndUpdate({ _id:request_id }, { 
            status: "Approve",
            collected_date: collected_date,
            approver: req.user._id,
            deposite: deposite,
        }).populate('requester').populate('request_to').populate('approver').then(result => {
            sendApproveEmailNotification(result,collected_date)
            return res.status(200).json({ "Message" : "Request Approved"})
        }).catch(err => {
            return res.status(404).json(err)
        })
    }
}

//Reject Request
exports.cancelRequest = (req,res) => {
    const { request_id,note } = req.body
    Requests.findOneAndUpdate({ _id:request_id }, {
        status: "Cancel",
        note: "ยกเลิกโดย " + req.user.first_name + " เนื่องจาก" + note
    }).populate('requester').populate('request_to').populate('approver').then(result => {
        Equipments.findOneAndUpdate({ _id:result.item },{ status:"Available" }).then(result2 => {
            return res.status(200).json({ "Message" : "Request Canceled"})
        }).catch(err => {
            return res.status(404).json(err)
        })
    })
}