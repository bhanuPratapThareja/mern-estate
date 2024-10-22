import { Router } from "express";

import { createListing } from "../controllers/listing.controller.js";
import { verifyUserToken } from "../middlewares/verifyUser.js";

const router = Router()

router.post('/create', verifyUserToken, createListing)

export default router