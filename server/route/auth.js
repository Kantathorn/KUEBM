const express = require('express')  
const passport = require('passport')
const Users = require('../models/Users')

const router = express.Router()

function isLoggedIn (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({'message': 'not logged-in'})
    } else {
        return next()
    }
}

router.post('/register', (req,res,next) => {
    const { email,password,first_name,last_name,student_id,phone_number,role } = req.body
    const new_user = new Users({
        username: email,
        email: email,
        first_name: first_name,
        last_name: last_name,
        student_id: student_id,
        phone_number: phone_number,
        role: role
    })
    Users.register(new_user, password, (err) => {
        if (err) {
            return res.status(400).json(err)
        }
        return res.json({'Message': 'Success to create new account'})
    })
})

router.post('/login', passport.authenticate('local'),(req,res) => {
    return res.json(req.user)
})

router.get('/logout',(req,res) => {
    req.logout((err) => {
		if (err) {
			return res.status(500).json(err)
		}
		return res.json({'message': 'successfully logged-out'})
	})
})

router.get('/islogin', isLoggedIn, (req,res,next) => {
    return res.json({'Message': 'Logged-in'})
})


module.exports = router
module.exports.isLoggedIn = isLoggedIn