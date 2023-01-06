const express = require('express')
const connectDB = require('./db/db')
import dotenv from 'dotenv'


dotenv.config()

const app = express()
connectDB()
const PORT = 3008
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
