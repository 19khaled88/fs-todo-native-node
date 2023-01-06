const User = require('../modal/user.modal')
const jwt = require('jsonwebtoken')
const sharp = require('sharp')
const cloudinary = require('../utili/cloudinary')
exports.createUser = async(req,res,next)=>{
    const body = (req.body)
    const ifExist =await User.findOne({email:body.email})
    if(ifExist) return res.send('This email address exist')
    const saveData =await User.create(req.body)
    res.json(saveData)
    next();
}

exports.signin=async(req,res,next)=>{
    const {email,password} = req.body
    const user =await User.findOne({email})
    if(!user) return res.json({success:false, message:'this user not found'})
  
    const isMatch = await user.comparePassword(password)
    if(!isMatch) return res.json({success:false, message:"password / email doesn't match"})
    const token = jwt.sign({email:user.email,userId:user._id},process.env.SECRET_TOKEN,{expiresIn:'1d'})
    res.json({success:true,user,token})
}

exports.profileUpdate=async(req,res)=>{
    const {user,files} = req 
        if(!user) return res.status(401).json({success:false,message:'unauthorized access'})

    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        
        if(result.public_id !== undefined && result.secure_url !==undefined){
           await User.findByIdAndUpdate(user._id,{avatar:result.secure_url,storage_id:result.public_id})
           res.status(201).json({success:true,message:'profile picture updated successful!'})
        }else{
            res.status(400).json({
                success:false,message:'profile picture update not successful!'
               })
        }
        //public_id
        //secure_url


        // const profileBuffer = req.file.buffer 
        // const imageInfo = await sharp(profileBuffer).metadata()
        // console.log(imageInfo)

        // res.status(200).json({
        //     user,result
        // })
    } catch (error) {
        res.status(500).json({success:false, message:'Server error, try after some time'})
    }
   
}