import express from "express"
import { updateUser, deleteUser } from "../controllers/user.controller.js"
import { verifyUserToken } from '../middlewares/verifyUser.js'

const router = express.Router()

router.patch('/update/:id', verifyUserToken, updateUser)
router.delete('/delete/:id', verifyUserToken, deleteUser)

export default router