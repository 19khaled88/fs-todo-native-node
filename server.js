const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('./db/db')
const app = express()

//middleware
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}))
app.use(bodyParser.json({limit:'50mb'}))

const userRouter = require('./route/user.router')


//routes

// app.use((req,res,next)=>{
//     req.on('data',chunk=>{
//         console.log(JSON.parse(chunk))
//     })
//     next()
// })
app.get('/test',(req,res)=>{
    res.json({success:true})
})
app.use(userRouter)


const PORT = 3008
app.listen(PORT, ()=>{
    console.log(`Server running on port number ${PORT}`)
})