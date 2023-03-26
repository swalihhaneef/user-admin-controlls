const express = require('express')
const user_route = express()
const body_parser = require('body-parser')
const path=require('path')
const session =  require('express-session')
const configue =require('../configue/configue')

 user_route.use(session({
    secret:configue.sesionSecret,
    resave: true,
    cookie:({maxAge:600000}),
    saveUninitialized: true}))



const auth =require('../middleware/auth')


user_route.use(body_parser.json())
user_route.use(body_parser.urlencoded({extended:true}))



user_route.set('view engine','ejs')
user_route.set('views','./views/users')

const userController = require('../controller/userController')

user_route.get('/register',auth.isLogout,userController.loadRegister)
user_route.post('/register',userController.insertUser)

user_route.get('/',auth.isLogout,userController.loginLoad)
user_route.get('/login',auth.isLogout,userController.loginLoad)

user_route.post('/login',userController.VerifyLogin)

user_route.get('/home',auth.isLogin,userController.loadHome)
user_route.get('/logout',auth.isLogin,userController.Userlogout)


module.exports = user_route