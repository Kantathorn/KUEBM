const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require('mongoose')
const passport = require('passport');
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
require("dotenv").config()

const app = express()

//DB Connect
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true
}).then(()=>console.log("Success to connect DB"))
.catch((err)=>console.log(err))

const Users = require('./models/Users')

app.use(express.json())
app.use(cors(
    {
        origin: [
            'http://localhost:3000'
        ],
        credentials: true
    }
))
app.use(morgan("dev"))

const port = process.env.PORT

const sessionConfig = {
    name: 'session-id',
    secret: 'KUEBM-Session-secret-2024',
    saveUninitialized: false,
    resave: false,
    cookie: { 
        httpOnly: false,
    }
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

//Import Route
const AuthRouter = require('./route/auth')
const ClubRouter = require('./route/club')
const UserRouter = require('./route/user')
const EquipmentRouter = require('./route/equipment')
//Route
app.use('/auth', AuthRouter)
app.use('/club',ClubRouter)
app.use('/user',UserRouter)
app.use('/equipment',EquipmentRouter)

app.listen(port,()=>console.log(`Start server in port ${port}`))