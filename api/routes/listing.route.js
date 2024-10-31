import { Router } from "express";

import { createListing, deleteListing, getListing, searchListings, updateListing } from "../controllers/listing.controller.js";
import { verifyUserToken } from "../middlewares/verifyUser.js";

const router = Router()

router.post('/create', verifyUserToken, createListing)
router.delete('/delete/:id', verifyUserToken, deleteListing)
router.post('/update/:id', verifyUserToken, updateListing)
router.get('/fetch/:id', getListing)
router.get('/search', searchListings)

export default router