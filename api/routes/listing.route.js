import { Router } from "express";

import { createListing, deleteListing, getListing, updateListing } from "../controllers/listing.controller.js";
import { verifyUserToken } from "../middlewares/verifyUser.js";

const router = Router()

router.post('/create', verifyUserToken, createListing)
router.delete('/delete/:id', verifyUserToken, deleteListing)
router.post('/update/:id', verifyUserToken, updateListing)
router.get('/fetch/:id', getListing)

export default router