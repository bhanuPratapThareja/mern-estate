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

export const updateListing = async (req, res, next) => {
    let listing;
    try {
        listing = await Listing.findById(req.params.id)
        if(!listing) {
            return next(errorHandler(404, 'Listing not found'))
        }
    } catch (error) {
        return next(error)
    }

    if(req.user.id !== listing.userRef.toString()) {
        return next(errorHandler(403, 'Invalid user'))
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true })
        const { _id, __v,  createdAt, updatedAt, ...rest } = updatedListing.toObject({ getters: true })
        res.status(200).json({ listing: rest })
    } catch (error) {
        console.log('l err: ', error)
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    let listing;
    try {
        listing = await Listing.findById(req.params.id)
        if(!listing) {
            return next(errorHandler(404, 'Listing not found'))
        }
    } catch (error) {
        return next(error)
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

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id)
        if(!listing) {
            return next(errorHandler(404, 'Listing not found'))
        }
        res.status(200).json(listing.toObject({ getters: true }))
    } catch (error) {
        next(error)
    }
}

export const getListings = async (req, res, next) => {
    try {
        const limit = +req.query.limit || 9 
        const startIndex = +req.query.startIndex || 0
        let offer = req.query.offer
        let furnished = req.query.furnished
        let parking = req.query.parking
        let type = req.query.type
        const searchTerm = req.query.searchTerm || ''
        const sort = req.query.sort || 'createdAt'
        const order = req.query.order || 'desc'

        if(offer === undefined || offer === 'false') {
            offer = { $in: [false, true] }
        }

        if(furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] }
        }

        if(parking === undefined || parking === 'false') {
            parking = { $in: [false, true] }
        }

        if(type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] }
        }

            const listings = await Listing.find({
                name: { $regex: searchTerm, $options: 'i' },
                offer,
                furnished,
                parking,
                type
            })
            .sort({
                [sort]: order
            })
            .limit(limit)
            .skip(startIndex)
            const nomarlizedListings = listings.map(listing => {
                return listing.toObject({ getters: true })
            })
            return res.status(200).json(nomarlizedListings)
    } catch (error) {
        next(error)
    }
}