import Listing from "../models/listing.model.js"
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"

export const createListing = async (req, res, next) => {
    req.body.userRef = req.user.id

    let user;
    try {
        user = await User.findById(req.user.id)
    } catch (error) {
        return next(error)
    }

    if(!user) {
        const error = errorHandler(404, 'Could not find user for provided id')
        return next(error)
    }

    // const listing = new Listing({
    // }) listing.save()

    
    try {
        const listing = await Listing.create(req.body)
        await User.findByIdAndUpdate(req.user.id, { $push: { listings: listing } })
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
        console.log('error1 ', error)
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
        console.log('error: ', error)
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
        await User.findByIdAndUpdate(req.user.id, { $pull: { listings: listing.id } })
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

export const searchListings = async (req, res, next) => {
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