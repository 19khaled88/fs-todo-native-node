const {body,check,validationResult} = require('express-validator')

exports.validateUserSignup=[
    check('fullName').trim().isString().withMessage('name must be string').not().isEmpty().withMessage('name must not be empty').isLength({min:1,max:20}).withMessage('Name must be within 1 to 20 character!'),
    check('email').not().isEmpty().withMessage('email must not be empty').isEmail().withMessage('Invalid email!'),
    check('password')
        .trim()
        .not()
        .notEmpty()
        .withMessage('password must not be empty')
        .isLength({min:8,max:20})
        .withMessage('Password must be 8 to 20 character long'),
    check('confirmPassword')
        .trim()
        .isLength({min:8,max:20})
        .withMessage('confirm password assword must be 8 to 20 character long')
        .not()
        .isEmpty()
        .withMessage('confirm password must not be empty')
        .custom((value,{req})=>{
            if(value !== req.body.password){
                throw new Error('Both password must be same!')
            }
            return true
        })
]

exports.validateUserSignin=[
    check('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('email must not be emptys')
        .isEmail()
        .withMessage('Given email is not valid'),

    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('password must not be empty')
]

exports.userValidation = (req,res,next)=>{
    const result = validationResult(req).array()
    if(!result.length) return next()

    const error = result[0].msg;
    res.json({success:false, message:error})
}