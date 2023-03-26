const userController  = require('../controller/userController')


const isLogin = async(req,res,next) =>{
    try {
        
        if(req.session.user){
            console.log('1');
            next()

        }else{
            res.redirect('/')
        }
        

    } catch (error) {
        console.log(error.message);
    }
}

const isLogout = async(req,res,next) =>{
    try {
        
        if(req.session.user){
            console.log("2");
            res.redirect('/home')
        }else{
            next()
        }
       
    } catch (error) {
        console.log(error.message);
    }
}

module.exports ={
    isLogin,
    isLogout
}