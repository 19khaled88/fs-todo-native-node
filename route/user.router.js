const express = require('express')
const { createUser, signin, profileUpdate } = require('../controller/user.controller')
const { isAuth } = require('../middleware/auth')
const { validateUserSignup, userValidation, validateUserSignin } = require('../middleware/checkValidity')
const cloudinaryUpload = require('../utili/cloudinaryUpload')



const router = express.Router()
// const app = express()
// app.use(express.json())

router.route('/signup').post(validateUserSignup,userValidation,createUser)
router.route('/signin').post(validateUserSignin,userValidation,signin)
//single image
// router.route('/upload-profile').post(isAuth,upload.single('singleImage'),profileUpdate)

//array of image
// router.route('/upload-profile').post(isAuth,upload.array('singleImage'),profileUpdate)

//cloudinary image upload
router.route('/upload-profile').post(isAuth,cloudinaryUpload.single('cloudinaryImage'),profileUpdate)
router.route('/get_users').get()

module.exports = router