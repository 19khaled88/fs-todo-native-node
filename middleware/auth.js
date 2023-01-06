const jwt = require('jsonwebtoken')
const User = require('../modal/user.modal')
exports.isAuth = async(req,res,next)=>{
    if(req.headers && req.headers.authorization){
       try {
            const token = req.headers.authorization
            const decode = jwt.verify(token, process.env.SECRET_TOKEN);
            const user = await User.findById(decode.userId)
            if(!user) return res.json({success:false, message:'unauthorized access'})
            req.user = user
            next()
       } catch (error) {
        if(error.name === 'JsonWebTokenError'){
            return res.json({success:false,message:'webtoken error,unauthorized access'})
        }
        if(error.name === 'TokenExpiredError'){
            return res.json({success:false,message:'Token has been expired!'})
        }
            return res.json({success:false,message:'Internal server error!'})
       }
    }else{
        res.json({success:false,message:'token not exist'})
    }
}