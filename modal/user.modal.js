const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const user ={
    fullName:'',
    email:'',
    password:'',
    avatar:''
}

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        index:true, 
        unique:true,
        sparse:true
    },
    password:{
        type:String,
        require:true
    },
    avatar:{
        type:String
    },
    storage_id:{
        type:String
    }
})

userSchema.pre('save',function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password, 8, (err,hash)=>{
            if(err) return next(err)

            this.password = hash 
            next();
        })
    }
})


userSchema.methods.comparePassword = async function (password){
    if(!password) throw new Error("password is missing, can't compare this")

    try{
      const result =  await bcrypt.compare(password, this.password)
      return result
    }catch(err){
      console.log('Password is not matching',err)
    }
}

module.exports = mongoose.model('User',userSchema)