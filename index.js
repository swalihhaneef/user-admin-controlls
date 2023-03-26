const mongoose = require('mongoose')
const logger=require('morgan')
const nocache=require('nocache')
mongoose.set ('strictQuery',false)
mongoose.connect("mongodb://127.0.0.1:27017/user_management")
// mongoose.set('strictQuery', true);

const express = require('express')
const app = express()

app.use(logger('dev'))
app.use(nocache())



//for user routes
const userRoute = require('./routes/userRoute')
app.use('/',userRoute)

//admin
const adminRoute = require('./routes/admin')
app.use('/admin',adminRoute)

app.listen(4000,()=>{
    console.log("server is running");
})