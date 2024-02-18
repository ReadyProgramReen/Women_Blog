const express = require ('express')
const dotenv = require('dotenv')
const cors = require('cors')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')
const User = require('./models/User')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
dotenv.config({path: './config/config.env'})

//hash password
const salt = bcrypt.genSaltSync(10)
connectDB()

const app = express()

app.use(cors());

//body parser

app.use(express.json())

app.post('/register',async(req,res)=>{
    try {
    const {username,password} = req.body;
    const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt),
    })
    res.json(userDoc)
    } catch (err) {
        res.status(400).json(err)
    }
    
})

app.post('/login',async(req,res)=>{
    // try {
        const {username,password} = req.body
    const userDoc = await User.findOne({username})
    const passOk = bcrypt.compareSync(password, userDoc.password)
    //     res.json(passOk)
    // } catch (error) {
    //     console.error(error, "Passsword or username invalid ")

    // }
    if(passOk){
        res.json('login  successful')
        
    }else{
        res.status(400).json('Wrong credentials');
    }
    

    
    
})


const PORT = process.env.PORT || 8501
app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} node on port ${PORT}` ))