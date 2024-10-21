import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import { errorHandler } from "../utils/error.js"

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'Login Id mismatch!'))
        
    let { password, username, email,avatar } = req.body

    if(password) {
        password = bcryptjs.hashSync(password, 10)
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: { username, email, avatar, password }
        }, { new: true })
        const { password: pass, ...userInfo } = updateUser.toObject({ getters: true })
        res.status(200).json(userInfo)
    } catch (error) {
        next(error)
    }
}