import express from 'express'
import { check, checkSchema, param, query, body } from 'express-validator'

import { signup, signin, google, signout, getNewAccessToken } from '../controllers/auth.controller.js'
import { singupValidationSchema, signinValidationchema } from '../validations/authValidation.schema.js'
import { verifyUserToken } from '../middlewares/verifyUser.js'

const router = express.Router()
 
router.post('/signup', [
    check('username')
        .trim()
        .notEmpty().withMessage('User Name cannot be empty')
        .isLength({ min: 4, max: 20 }).withMessage('User Name between 4 and 20 characters allowed'),
    check('email')
        .trim()
        .normalizeEmail()
        .notEmpty().withMessage('Password cannot be empty')
        .isEmail().withMessage('Email id must be valid'),
    check('password')
        .trim()
        .isLength({ min: 8, max: 16 }).withMessage('Password between 8 and 16 characters allowed')
], signup)

// router.post('/signup', checkSchema(singupValidationSchema) ,signup)
// router.post('/signin' ,[
//     body('email')
//         .trim()
//         .notEmpty().withMessage('Email cannot be empty')
//         .normalizeEmail()
//         .isEmail().withMessage('Invalid email Id'),
//     body('password')
//         .trim()
//         .notEmpty().withMessage('Password cannot be empty')
// ], signin)

router.post('/signin', checkSchema(signinValidationchema), signin)

router.post('/google', google)
router.post('/signout', signout)
router.post('/refresh-token', getNewAccessToken)

export default router