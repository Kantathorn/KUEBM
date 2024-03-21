const Clubs = require('../models/Clubs')
const Users = require('../models/Users')
const Equipments = require('../models/Equipments')
const EquipmentCategories = require('../models/EquipmentCategories')

// Create New Category
exports.newEquipmentCategory = (req,res) => {
    const { name } = req.body
    const new_types = new EquipmentCategories({
        name: name
    })
    new_types.save().then(success => {
        return res.status(200).json({ 'Message': 'Success'});
    })
    .catch(err => {
        return res.status(400).json(err);
    });
}

// Get Equipment Category
exports.getCategory = (req,res) => {
    EquipmentCategories.find().then(result => {
        return res.json(result)
    }).catch(err => {
        return res.status(404).json(err)
    })
}

// Add New equipment
exports.addEquipment = (req,res) => {
    const { name,detail,category,owner,cost,fsn } = req.body
    const new_equipment = new Equipments({
        name: name,
        detail: detail,
        category: category,
        owner: owner,
        cost: cost,
        fsn: fsn,
        status: 'Available',
        created_by: req.user._id,
        updated_by: req.user._id
    })
    new_equipment.save().then(success => {
        return res.status(200).json({ "Message" : "Add Equipment Successful"})
    })
    .catch(err => {
        return res.status(400).json(err);
    });
}

// Get Equipment by club
exports.getEquipmentByClub = (req,res) => {
    const { club } = req.body
    Equipments.find({owner:club}).populate('owner').populate('category').populate('created_by').populate('updated_by').then(result => {
        return res.status(200).json(result)
    }).catch(err => {
        return res.status(404).json(err)
    })
}

// Get All Available Equipment
exports.getAllEquipment = (req,res) => {
    Equipments.find({status:"Available"}).populate('owner').populate('category').populate('created_by').populate('updated_by').then(result => {
        return res.status(200).json(result)
    }).catch(err => {
        return res.status(404).json(err)
    })
}

//Change Equipment Status
exports.changeStatus = (req,res) => {
    const { equipment,status } = req.body
    Equipments.findOneAndUpdate({ _id:equipment },{ status:status }).then(result => {
        return res.status(200).json({ "Message" : "Change Equipment Status Successful"})
    }).catch(err => {
        return res.status(404).json(err)
    })
}