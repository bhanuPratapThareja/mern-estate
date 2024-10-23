import Listing from "../models/listing.model.js"

export const createListing = async (req, res, next) => {
    req.body.userRef = req.user.id
    try {
        const listing = await Listing.create(req.body)
        return res.status(201).json({ listing: listing.toObject({ getters: true })})
    } catch (error) {
        console.log('listing err: ', error)
        next(error)
    }
}