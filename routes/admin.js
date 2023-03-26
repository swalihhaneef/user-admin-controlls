const express = require('express')
const admin_route = express()
const config =require('../configue/configue')

const session = require('express-session')
admin_route.use(session({
    secret:config.sesionSecret,
    resave: true,
    cookie:({maxAge:600000}),
    saveUninitialized: true}))




const bodyParser= require('body-parser')
admin_route.use(bodyParser.json())
admin_route.use(bodyParser.urlencoded({extended:true}))

admin_route.set('view engine','ejs')
admin_route.set('views','./views/admin')

const auth = require('../middleware/addminAuth')

const admineController = require('../controller/adminController')

admin_route.get('/',auth.isLogout,admineController.loadLogin)
admin_route.post('/',admineController.verifyLogin)


admin_route.get('/adminhome',auth.isLogin,admineController.loadDashboard)

admin_route.get('/new-user',auth.isLogin,admineController.newUser)
admin_route.post('/new-user',admineController.insertUser)


admin_route.get('/edit',auth.isLogin,admineController.editUser)
admin_route.post('/edit',admineController.updateUser)

admin_route.get('/delet',admineController.deletUser)
admin_route.get('/logout',auth.isLogin,admineController.logout)

module.exports = admin_route