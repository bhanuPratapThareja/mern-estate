import { Router } from "express";

import { createListing, deleteListing } from "../controllers/listing.controller.js";
import { verifyUserToken } from "../middlewares/verifyUser.js";

const router = Router()

router.post('/create', verifyUserToken, createListing)
router.delete('/delete/:id', verifyUserToken, deleteListing)

export default router