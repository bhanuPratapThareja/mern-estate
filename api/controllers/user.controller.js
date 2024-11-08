import bcryptjs from 'bcryptjs'
import { validationResult } from 'express-validator'

import User from '../models/user.model.js'
import Listing from '../models/listing.model.js'
import { errorHandler, getError } from "../utils/error.js"
import HttpError from '../utils/http-error.js'

const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(new HttpError('User is unauthorized!', 401))
    }

    if(req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        const { password: pass, ...userInfo } = updateUser.toObject({ getters: true })
        res.status(200).json({ user: userInfo, status: 200, message: 'User is updated successfully!' })
    } catch (error) {
        console.log('update err: ', error)
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, 'Login Id mismatch!'))
    }

    let user;

    try {
        user = await User.findById(req.user.id)
        if(!user) {
            const error = errorHandler(404, 'Could not find user for provided id')
            return next(error)
        }
    } catch (error) {
        return next(error)
    }

    try {
        await User.findByIdAndDelete(req.params.id)
        await Listing.deleteMany({ _id: { $in: user.listings } })
        res.clearCookie('access_token')
        res.status(200).json('User has been deleted!')
    } catch (error) {
        next(error)
    }
}

const getUserListings = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, 'Login Id mismatch!'))
    }

    try {
        const listings = await Listing.find({ userRef: req.params.id })
        const listingsWithIds = listings.map(listing => {
            const { __v, _id, ...rest } = listing.toObject({ getters: true })
            return rest
        })
        res.status(200).json(listingsWithIds)
    } catch (error) {
        return next(error)
    }
}

const getUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(403, 'Unable to fetch user. Unauthorized!'))
    }
    
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            return next(errorHandler(404, 'User not found!'))
        }
        const { password, ...rest } = user.toObject({ getters: true })
        res.status(200).json({ user: rest })
    } catch (error) {
        
    }
}

export {
    updateUser,
    deleteUser,
    getUserListings,
    getUser
}