import express from "express"
import { userGet } from "../controllers/user.controller.js"

const router = express.Router()

router.get('/', userGet)

export default router