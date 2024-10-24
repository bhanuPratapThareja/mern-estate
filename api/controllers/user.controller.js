import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import Listing from '../models/listing.model.js'
import { errorHandler } from "../utils/error.js"

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        const error = errorHandler(401, 'Login Id mismatch!')
        return res.status(403).send(new Error('User not authorized! Login ID mismatch!'))
    }

    if(req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        const { password: pass, ...userInfo } = updateUser.toObject({ getters: true })
        res.status(200).json({ user: userInfo })
    } catch (error) {
        console.log('update err: ', error)
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        const error = errorHandler(401, 'Login Id mismatch!')
        return res.status(403).send(new Error('User not authorized! Login ID mismatch!'))
    }

    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json('User has been deleted!')
    } catch (error) {
        next(error)
    }
}

export const getUserListings = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(403, 'Invalid User. You can only view you own listings.'))
    }

    try {
        const listings = await Listing.find({ userRef: req.params.id })
        const listingsWithIds = listings.map(listing => {
            const { __v, _id, createdAt, updatedAt, ...rest } = listing.toObject({ getters: true })
            return rest
        })
        res.status(200).json(listingsWithIds)
    } catch (error) {
        return next(error)
    }
}