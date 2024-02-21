const express = require ('express')
const dotenv = require('dotenv')
const cors = require('cors')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')
const User = require('./models/User')
const Post = require('./models/Post')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const multer = require('multer')
const upload = multer({dest: '.middleware/uploads'})
const bcrypt = require('bcryptjs')
const fs = require('fs')
dotenv.config({path: './config/config.env'})

//hash password
const salt = bcrypt.genSaltSync(10)
const secret = 'kgfvhjkoiuyfvbgyhjidkefwsftgvhvcvtdtwyvhfuiwdadjcscb '

connectDB()

const app = express()

//cors 
app.use(cors({credentials:true, origin:'http://localhost:3000' }));
//body parser
app.use(express.json())
//cookie parser
app.use(cookieParser())

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

        const {username,password} = req.body;
    const userDoc = await User.findOne({username})
   const passOk =  bcrypt.compareSync(password, userDoc.password)
    if(passOk){
        //logged in
        jwt.sign({username,id:userDoc._id}, secret, {},(err,token)=>{
            if(err)throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            })
        })
    }else{
        res.status(400).json('Wrong info')
    }
    
})


app.get('/profile',(req,res)=>{
 const {token}= req.cookies;
jwt.verify(token, secret , {},(err,info)=>{
if(err) throw err;
res.json(info) 

});
})


app.post('/logout',(req,res)=>{
    res.cookie('token', '').json('ok');
})

app.post('/post',upload.single('file'),async (req,res)=>{
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

 
    const {token}= req.cookies;
    jwt.verify(token, secret , {}, async(err,info)=>{
        if(err) throw err;
        const {title, summary, content} = req.body
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
           author:info.id
        })
        res.json(postDoc)
    
        
        })


    
})

app.get('/post', async(req,res)=>{
    const post =  await Post.find()
    .populate('author',['username'])
    .sort({createdAt: -1})
    .limit
    // res.json(post)
})
const PORT = process.env.PORT || 8501
app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} node on port ${PORT}` ))