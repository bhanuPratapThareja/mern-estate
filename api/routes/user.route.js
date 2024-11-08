import express from "express"
import { param } from 'express-validator'

import * as userController from '../controllers/user.controller.js'
import { verifyUserToken } from '../middlewares/verifyUser.js'

const router = express.Router()

router.patch('/update/:id', verifyUserToken, userController.updateUser)
router.delete('/delete/:id', verifyUserToken, userController.deleteUser)
router.get('/listings/:id', verifyUserToken, userController.getUserListings)
router.get('/:id', verifyUserToken, userController.getUser)

export default router