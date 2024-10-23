import express from "express"
import { updateUser, deleteUser, getUserListings } from "../controllers/user.controller.js"
import { verifyUserToken } from '../middlewares/verifyUser.js'

const router = express.Router()

router.patch('/update/:id', verifyUserToken, updateUser)
router.delete('/delete/:id', verifyUserToken, deleteUser)
router.get('/listings/:id', verifyUserToken, getUserListings)

export default router