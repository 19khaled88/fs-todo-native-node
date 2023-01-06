const multer = require('multer')


const fileStorageEngine = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, './uploads')
    },
    filename:(req,file,cb)=>{
        cb(null, new Date().toISOString()+'--'+file.originalname)
    }
})

const fileFilter = (req,file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }else{
        cb({message:'Only jpeg, jpg, and png supported!'})
    }
}

const upload = multer({
    storage:fileStorageEngine,
    limits:{fileSize:1024 * 1024},
    fileFilter:fileFilter
})

module.exports = upload