const multer = require('multer');
const path = require('path')


//multer configuration
module.exports = multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
        let ext = path.extname(file.originalname)
        if(ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png'){
            cb(new Error('File type is not supported, except jpeg, jpg, and png!'),false)
            return;
        }cb(null, true)
    },
    limits:{fileSize:1024 * 1024}
})