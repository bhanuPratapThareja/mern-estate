import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js"

export const createListing = async (req, res, next) => {
    req.body.userRef = req.user.id
    try {
        const listing = await Listing.create(req.body)
        return res.status(201).json({ listing: listing.toObject({ getters: true })})
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    let listing;
    try {
        listing = await Listing.findById(req.params.id)
        console.log('listing1: ', listing)
        if(!listing) {
            return next(errorHandler(404, 'Listing not found'))
        }
    } catch (error) {
        next(error)
    }

    if(req.user.id !== listing.userRef.toString()) {
        return next(errorHandler(403, 'Invalid user'))
    }

    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Listing deleted', id: req.params.id })
    } catch (error) {
        next(error)
    }
}