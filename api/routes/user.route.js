import express from "express"
import { updateUser } from "../controllers/user.controller.js"
import { verifyUserToken } from '../middlewares/verifyUser.js'

const router = express.Router()

router.post('/update/:id', verifyUserToken, updateUser)

export default router